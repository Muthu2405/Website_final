from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"services", views.ServiceViewSet)
router.register(r"projects", views.ProjectViewSet)
router.register(r"team", views.TeamMemberViewSet)
router.register(r"testimonials", views.TestimonialViewSet)
router.register(r"pricing", views.PricingPlanViewSet)
router.register(r"admin/users", views.AdminUserViewSet, basename="admin-users")
router.register(r"admin/developers", views.AdminDeveloperViewSet, basename="admin-developers")
router.register(r"admin/admins", views.AdminAccountViewSet, basename="admin-admins")

urlpatterns = [
    path("", include(router.urls)),
    path("auth/signup/", views.signup, name="signup"),
    path("auth/login/", views.login, name="login"),
    path("auth/logout/", views.logout, name="logout"),
    path("auth/me/", views.me, name="me"),
    path("auth/change-password/", views.change_password, name="change-password"),
]
