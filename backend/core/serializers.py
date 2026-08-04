from rest_framework import serializers
from .models import Service, Project, TeamMember, Testimonial, PricingPlan, BusinessUser


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


class BusinessUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = BusinessUser
        fields = [
            "id", "name", "email", "phone", "referral", "role",
            "business", "type", "category", "location", "city", "state",
            "country", "pincode", "website", "username", "password",
            "agree_marketing", "planet_id", "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        user = BusinessUser(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
