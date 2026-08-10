from rest_framework import serializers
from .models import Service, Project, TeamMember, Testimonial, PricingPlan, User, Developer, Admin


def validate_gmail_email(value):
    if not value.lower().endswith("@gmail.com"):
        raise serializers.ValidationError("Email must be a @gmail.com address.")
    return value


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ["id", "icon", "title", "desc", "tags", "price", "time", "order"]


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["id", "title", "desc", "long_desc", "tags", "img", "order"]


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ["id", "name", "role", "skills", "experience", "bio", "photo", "order"]


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ["id", "name", "role", "text", "highlight", "image", "rating", "order"]


class PricingPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = PricingPlan
        fields = ["id", "name", "price", "features", "desc", "order"]


# ── Account serializers ──────────────────────────────────────────────
# Each account type lives in its own DB table (User / Developer / Admin).
# Every account payload includes a fixed "account_type" string so the
# frontend can tell which table a logged-in account came from.

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, min_length=6)
    email = serializers.EmailField(validators=[validate_gmail_email])
    account_type = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id", "account_type", "name", "email", "phone", "referral", "role",
            "business", "type", "category", "location", "city", "state",
            "country", "pincode", "website", "username", "password",
            "agree_marketing", "planet_id", "must_change_password", "created_at",
        ]
        read_only_fields = ["id", "must_change_password", "created_at"]

    def get_account_type(self, obj):
        return "user"

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user


class DeveloperSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, min_length=6)
    email = serializers.EmailField(validators=[validate_gmail_email])
    account_type = serializers.SerializerMethodField()

    class Meta:
        model = Developer
        fields = [
            "id", "account_type", "name", "email", "phone", "username", "password",
            "skills", "github_url", "portfolio_url", "bio", "must_change_password", "created_at",
        ]
        read_only_fields = ["id", "must_change_password", "created_at"]

    def get_account_type(self, obj):
        return "developer"

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        dev = Developer(**validated_data)
        if password:
            dev.set_password(password)
        dev.save()
        return dev


class AdminCreateDeveloperSerializer(serializers.ModelSerializer):
    """Used by an admin to add a developer account with a temporary
    password. The developer must change it on first login."""
    password = serializers.CharField(write_only=True, required=True, min_length=6)
    email = serializers.EmailField(validators=[validate_gmail_email])
    account_type = serializers.SerializerMethodField()

    class Meta:
        model = Developer
        fields = ["id", "account_type", "name", "email", "phone", "password",
                  "skills", "github_url", "portfolio_url", "bio", "must_change_password", "created_at"]
        read_only_fields = ["id", "must_change_password", "created_at"]

    def get_account_type(self, obj):
        return "developer"

    def create(self, validated_data):
        password = validated_data.pop("password")
        dev = Developer(**validated_data, must_change_password=True)
        dev.set_password(password)
        dev.save()
        return dev


class AdminSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, min_length=6)
    email = serializers.EmailField(validators=[validate_gmail_email])
    account_type = serializers.SerializerMethodField()
    is_admin = serializers.SerializerMethodField()

    class Meta:
        model = Admin
        fields = [
            "id", "account_type", "name", "email", "phone", "username", "password",
            "is_admin", "is_superuser", "must_change_password", "created_at",
        ]
        read_only_fields = ["id", "must_change_password", "created_at"]

    def get_account_type(self, obj):
        return "admin"

    def get_is_admin(self, obj):
        return True

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        admin = Admin(**validated_data)
        if password:
            admin.set_password(password)
        admin.save()
        return admin


# Read-only directory views used on the admin user-management screens.
class UserDirectorySerializer(serializers.ModelSerializer):
    account_type = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "account_type", "name", "email", "phone", "business", "type", "category",
                  "city", "state", "country", "must_change_password", "created_at"]

    def get_account_type(self, obj):
        return "user"


class DeveloperDirectorySerializer(serializers.ModelSerializer):
    account_type = serializers.SerializerMethodField()

    class Meta:
        model = Developer
        fields = ["id", "account_type", "name", "email", "phone", "skills",
                  "github_url", "portfolio_url", "must_change_password", "created_at"]

    def get_account_type(self, obj):
        return "developer"


class AdminDirectorySerializer(serializers.ModelSerializer):
    """Used on the admin account-management screen. Never exposes password_hash.
    is_superuser is writable here — access is restricted at the view level
    (IsSuperUser) rather than the serializer."""
    account_type = serializers.SerializerMethodField()

    class Meta:
        model = Admin
        fields = ["id", "account_type", "name", "email", "phone", "is_superuser", "must_change_password", "created_at"]
        read_only_fields = ["id", "name", "email", "phone", "created_at"]

    def get_account_type(self, obj):
        return "admin"


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(validators=[validate_gmail_email])
    password = serializers.CharField(write_only=True)


class PasswordChangeSerializer(serializers.Serializer):
    current_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, min_length=6)
