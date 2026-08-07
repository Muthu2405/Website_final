import secrets

from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import Service, Project, TeamMember, Testimonial, PricingPlan, BusinessUser
from .permissions import IsAdminOrReadOnly, IsAdminUser
from .serializers import (
    ServiceSerializer, ProjectSerializer, TeamMemberSerializer,
    TestimonialSerializer, PricingPlanSerializer,
    BusinessUserSerializer, AdminUserSerializer, LoginSerializer,
)

# Emails that are automatically granted admin access whenever they sign up
# (or on every login, in case the flag was ever lost e.g. after a DB reset).
SEED_ADMIN_EMAILS = {"muthu200524@gmail.com"}


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


class AdminUserViewSet(viewsets.ModelViewSet):
    """Admin-only user directory: list/view registered businesses, toggle admin, remove accounts."""
    queryset = BusinessUser.objects.all().order_by("-created_at")
    serializer_class = AdminUserSerializer
    permission_classes = [IsAdminUser]
    http_method_names = ["get", "patch", "delete", "head", "options"]


@api_view(["POST"])
@permission_classes([AllowAny])
def signup(request):
    if BusinessUser.objects.filter(email=request.data.get("email")).exists():
        return Response(
            {"detail": "An account with this email already exists."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    serializer = BusinessUserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    user.auth_token = secrets.token_hex(24)
    update_fields = ["auth_token"]
    if user.email in SEED_ADMIN_EMAILS and not user.is_admin:
        user.is_admin = True
        update_fields.append("is_admin")
    user.save(update_fields=update_fields)
    return Response(
        {"user": BusinessUserSerializer(user).data, "token": user.auth_token},
        status=status.HTTP_201_CREATED,
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.validated_data["email"]
    password = serializer.validated_data["password"]

    try:
        user = BusinessUser.objects.get(email=email)
    except BusinessUser.DoesNotExist:
        return Response({"detail": "No account found with this email."}, status=status.HTTP_400_BAD_REQUEST)

    if not user.check_password(password):
        return Response({"detail": "Incorrect password."}, status=status.HTTP_400_BAD_REQUEST)

    user.auth_token = secrets.token_hex(24)
    update_fields = ["auth_token"]
    if user.email in SEED_ADMIN_EMAILS and not user.is_admin:
        user.is_admin = True
        update_fields.append("is_admin")
    user.save(update_fields=update_fields)
    return Response({"user": BusinessUserSerializer(user).data, "token": user.auth_token})


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
        return Response(BusinessUserSerializer(request.user).data)

    # PATCH — partial update of the logged-in user's own profile.
    # Password/username/admin-flag changes are intentionally excluded here;
    # is_admin can only be changed via the admin user-management endpoint.
    data = {k: v for k, v in request.data.items() if k not in ("password", "username", "planet_id", "auth_token", "is_admin")}
    serializer = BusinessUserSerializer(request.user, data=data, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)