import secrets

from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes, action, throttle_classes
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import SimpleRateThrottle

from .models import Service, Project, TeamMember, Testimonial, PricingPlan, User, Developer, Admin
from .permissions import IsAdminOrReadOnly, IsAdminUser, IsSuperUser
from .serializers import (
    ServiceSerializer, ProjectSerializer, TeamMemberSerializer,
    TestimonialSerializer, PricingPlanSerializer,
    UserSerializer, DeveloperSerializer, AdminSerializer, AdminCreateDeveloperSerializer,
    UserDirectorySerializer, DeveloperDirectorySerializer, AdminDirectorySerializer,
    LoginSerializer, PasswordChangeSerializer,
)

# Emails that are automatically granted admin access whenever they sign up
# or log in (moved into the Admin table if they aren't there already —
# handles the case where the flag/table was ever lost e.g. after a DB reset).
SEED_ADMIN_EMAILS = {"muthu200524@gmail.com"}

# Emails within SEED_ADMIN_EMAILS that are additionally granted superuser access.
SEED_SUPERUSER_EMAILS = {"muthu200524@gmail.com"}

ACCOUNT_SERIALIZERS = {"user": UserSerializer, "developer": DeveloperSerializer, "admin": AdminSerializer}
ACCOUNT_MODELS = {"user": User, "developer": Developer, "admin": Admin}


class LoginRateThrottle(SimpleRateThrottle):
    """Per-IP throttle on login attempts to slow down brute-forcing."""
    scope = "login"

    def get_cache_key(self, request, view):
        return self.cache_format % {"scope": self.scope, "ident": self.get_ident(request)}


class SignupRateThrottle(SimpleRateThrottle):
    """Per-IP throttle on signup to slow down automated account creation."""
    scope = "signup"

    def get_cache_key(self, request, view):
        return self.cache_format % {"scope": self.scope, "ident": self.get_ident(request)}


def _account_type(account):
    if isinstance(account, Admin):
        return "admin"
    if isinstance(account, Developer):
        return "developer"
    return "user"


def _serialize_account(account):
    serializer_cls = ACCOUNT_SERIALIZERS[_account_type(account)]
    return serializer_cls(account).data


def _email_exists_anywhere(email):
    return (User.objects.filter(email=email).exists()
            or Developer.objects.filter(email=email).exists()
            or Admin.objects.filter(email=email).exists())


def _find_account_by_email(email):
    """Look up an account across all three tables. Returns the instance or None."""
    for model in (User, Developer, Admin):
        account = model.objects.filter(email=email).first()
        if account:
            return account
    return None


def _apply_seed_admin(account):
    """If this account's email is a seed-admin email but it's sitting in the
    User/Developer table, move it into Admin (creating it there, deleting the
    old row) and grant superuser if applicable. Returns the (possibly new)
    account instance."""
    if account.email not in SEED_ADMIN_EMAILS or isinstance(account, Admin):
        # Already an Admin (or not a seed email) — just make sure superuser is set.
        if isinstance(account, Admin) and account.email in SEED_SUPERUSER_EMAILS and not account.is_superuser:
            account.is_superuser = True
            account.save(update_fields=["is_superuser"])
        return account

    admin = Admin.objects.create(
        name=account.name, email=account.email, phone=account.phone,
        username=account.username, password_hash=account.password_hash,
        auth_token=account.auth_token, created_at=account.created_at,
        must_change_password=account.must_change_password,
        is_superuser=account.email in SEED_SUPERUSER_EMAILS,
    )
    account.delete()
    return admin


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAdminOrReadOnly]  # public reads, admin-only writes


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminOrReadOnly]


class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    permission_classes = [IsAdminOrReadOnly]


class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [IsAdminOrReadOnly]


class PricingPlanViewSet(viewsets.ModelViewSet):
    queryset = PricingPlan.objects.all()
    serializer_class = PricingPlanSerializer
    permission_classes = [IsAdminOrReadOnly]


def _promote_to_admin(instance, model):
    if Admin.objects.filter(email=instance.email).exists():
        raise ValidationError({"detail": "An admin account with this email already exists."})
    if instance.must_change_password:
        # The account holder hasn't proven they know their own password yet
        # (still on an admin-set temporary one) — don't hand out admin
        # powers until they've actually logged in and set their own.
        raise ValidationError({
            "detail": "This account still has a temporary password. "
                      "They must log in and set their own password before being promoted to admin."
        })
    admin = Admin.objects.create(
        name=instance.name, email=instance.email, phone=instance.phone,
        username=instance.username, password_hash=instance.password_hash,
        auth_token=instance.auth_token, created_at=instance.created_at,
        must_change_password=instance.must_change_password,
    )
    instance.delete()
    return admin


class AdminUserViewSet(viewsets.ModelViewSet):
    """Directory of regular Users. Any admin can list/view; removing an
    account or promoting it to Admin is restricted to superusers."""
    queryset = User.objects.all().order_by("-created_at")
    serializer_class = UserDirectorySerializer
    http_method_names = ["get", "delete", "post", "head", "options"]

    def get_permissions(self):
        if self.action in ("destroy", "promote"):
            return [IsSuperUser()]
        return [IsAdminUser()]

    @action(detail=True, methods=["post"])
    def promote(self, request, pk=None):
        admin = _promote_to_admin(self.get_object(), User)
        return Response(AdminDirectorySerializer(admin).data)


class AdminDeveloperViewSet(viewsets.ModelViewSet):
    """Directory of Developer accounts. Any admin can list/view and add a
    developer (email + temporary password — the developer must change it on
    first login). Removing an account or promoting it to Admin is restricted
    to superusers."""
    queryset = Developer.objects.all().order_by("-created_at")
    serializer_class = DeveloperDirectorySerializer
    http_method_names = ["get", "post", "delete", "head", "options"]

    def get_permissions(self):
        if self.action in ("destroy", "promote"):
            return [IsSuperUser()]
        return [IsAdminUser()]  # list, retrieve, create

    def get_serializer_class(self):
        if self.action == "create":
            return AdminCreateDeveloperSerializer
        return DeveloperDirectorySerializer

    def create(self, request, *args, **kwargs):
        if Developer.objects.filter(email=request.data.get("email")).exists() or \
           User.objects.filter(email=request.data.get("email")).exists() or \
           Admin.objects.filter(email=request.data.get("email")).exists():
            return Response({"detail": "An account with this email already exists."}, status=status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)

    @action(detail=True, methods=["post"])
    def promote(self, request, pk=None):
        admin = _promote_to_admin(self.get_object(), Developer)
        return Response(AdminDirectorySerializer(admin).data)


class AdminAccountViewSet(viewsets.ModelViewSet):
    """Directory of Admin accounts. Any admin can list/view. Toggling
    is_superuser, demoting back to a regular User, or removing an admin
    outright is restricted to superusers."""
    queryset = Admin.objects.all().order_by("-created_at")
    serializer_class = AdminDirectorySerializer
    http_method_names = ["get", "patch", "delete", "post", "head", "options"]

    def get_permissions(self):
        if self.action in ("partial_update", "update", "destroy", "demote"):
            return [IsSuperUser()]
        return [IsAdminUser()]

    def _guard_last_superuser(self, instance):
        if instance.is_superuser and Admin.objects.filter(is_superuser=True).exclude(pk=instance.pk).count() == 0:
            raise ValidationError({"detail": "Can't remove the last remaining superuser."})

    def perform_update(self, serializer):
        instance = serializer.instance
        if instance.is_superuser and not serializer.validated_data.get("is_superuser", True):
            self._guard_last_superuser(instance)
        serializer.save()

    def perform_destroy(self, instance):
        self._guard_last_superuser(instance)
        instance.delete()

    @action(detail=True, methods=["post"])
    def demote(self, request, pk=None):
        admin = self.get_object()
        self._guard_last_superuser(admin)
        if User.objects.filter(email=admin.email).exists():
            raise ValidationError({"detail": "A user account with this email already exists."})
        user = User.objects.create(
            name=admin.name, email=admin.email, phone=admin.phone,
            username=admin.username, password_hash=admin.password_hash,
            auth_token=admin.auth_token, created_at=admin.created_at,
            must_change_password=admin.must_change_password,
        )
        admin.delete()
        return Response(UserDirectorySerializer(user).data)


@api_view(["POST"])
@permission_classes([AllowAny])
@throttle_classes([SignupRateThrottle])
def signup(request):
    account_type = request.data.get("account_type", "user")
    if account_type not in ACCOUNT_SERIALIZERS or account_type == "admin":
        # Public signup only creates User/Developer accounts — Admin accounts
        # are created by promoting an existing account (superuser-only).
        return Response({"detail": "Invalid account_type."}, status=status.HTTP_400_BAD_REQUEST)

    email = request.data.get("email")
    if _email_exists_anywhere(email):
        return Response(
            {"detail": "An account with this email already exists."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    if not request.data.get("password"):
        return Response({"password": ["This field is required."]}, status=status.HTTP_400_BAD_REQUEST)

    serializer_cls = ACCOUNT_SERIALIZERS[account_type]
    serializer = serializer_cls(data=request.data)
    serializer.is_valid(raise_exception=True)
    account = serializer.save()
    account.auth_token = secrets.token_hex(24)
    account.save(update_fields=["auth_token"])
    account = _apply_seed_admin(account)

    return Response(
        {"user": _serialize_account(account), "token": account.auth_token},
        status=status.HTTP_201_CREATED,
    )


@api_view(["POST"])
@permission_classes([AllowAny])
@throttle_classes([LoginRateThrottle])
def login(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.validated_data["email"]
    password = serializer.validated_data["password"]

    account = _find_account_by_email(email)
    if account is None or not account.check_password(password):
        return Response({"detail": "Invalid email or password."}, status=status.HTTP_400_BAD_REQUEST)

    account.auth_token = secrets.token_hex(24)
    account.save(update_fields=["auth_token"])
    account = _apply_seed_admin(account)

    return Response({"user": _serialize_account(account), "token": account.auth_token})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_password(request):
    serializer = PasswordChangeSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    account = request.user

    if not account.check_password(serializer.validated_data["current_password"]):
        return Response({"detail": "Current password is incorrect."}, status=status.HTTP_400_BAD_REQUEST)

    account.set_password(serializer.validated_data["new_password"])
    account.must_change_password = False
    account.save(update_fields=["password_hash", "must_change_password"])
    return Response(_serialize_account(account))


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout(request):
    request.user.auth_token = ""
    request.user.save(update_fields=["auth_token"])
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET", "PATCH"])
@permission_classes([IsAuthenticated])
def me(request):
    if request.method == "GET":
        return Response(_serialize_account(request.user))

    # PATCH — partial update of the logged-in account's own profile.
    # Password/username/role changes are intentionally excluded here;
    # role changes only happen via the admin account-management endpoints.
    data = {k: v for k, v in request.data.items()
            if k not in ("password", "username", "planet_id", "auth_token", "is_admin", "is_superuser", "account_type")}
    serializer_cls = ACCOUNT_SERIALIZERS[_account_type(request.user)]
    serializer = serializer_cls(request.user, data=data, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)
