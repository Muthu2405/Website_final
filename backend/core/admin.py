from django.contrib import admin
from .models import Service, Project, TeamMember, Testimonial, PricingPlan, BusinessUser


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ["title", "price", "time", "order"]


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["title", "order"]


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ["name", "role", "order"]


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ["name", "role", "rating", "order"]


@admin.register(PricingPlan)
class PricingPlanAdmin(admin.ModelAdmin):
    list_display = ["name", "price", "order"]


@admin.register(BusinessUser)
class BusinessUserAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "business", "created_at"]
    exclude = ["password_hash", "auth_token"]
