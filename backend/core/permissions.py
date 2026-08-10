from rest_framework.permissions import SAFE_METHODS, BasePermission


def _is_admin(user):
    # Superusers are always treated as admins too, so promoting someone to
    # superuser doesn't require separately flipping is_admin as well.
    return bool(user and (getattr(user, "is_admin", False) or getattr(user, "is_superuser", False)))


class IsAdminOrReadOnly(BasePermission):
    """Public content is readable by anyone; only an admin BusinessUser can write."""

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return _is_admin(getattr(request, "user", None))


class IsAdminUser(BasePermission):
    """Admin-only, including reads (used for the user-management endpoints)."""

    def has_permission(self, request, view):
        return _is_admin(getattr(request, "user", None))


class IsSuperUser(BasePermission):
    """Superuser-only. Used to gate changes to other users' admin/superuser status."""

    def has_permission(self, request, view):
        user = getattr(request, "user", None)
        return bool(user and getattr(user, "is_superuser", False))
