from rest_framework.permissions import SAFE_METHODS, BasePermission


class IsAdminOrReadOnly(BasePermission):
    """Public content is readable by anyone; only an admin BusinessUser can write."""

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        user = getattr(request, "user", None)
        return bool(user and getattr(user, "is_admin", False))


class IsAdminUser(BasePermission):
    """Admin-only, including reads (used for the user-management endpoints)."""

    def has_permission(self, request, view):
        user = getattr(request, "user", None)
        return bool(user and getattr(user, "is_admin", False))
