from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .models import BusinessUser


class BusinessUserTokenAuthentication(BaseAuthentication):
    """
    Simple 'Authorization: Token <token>' scheme backed by
    BusinessUser.auth_token. Not full Django auth — matches the
    lightweight signup/login flow this frontend already has.
    """

    keyword = "Token"

    def authenticate(self, request):
        auth_header = request.META.get("HTTP_AUTHORIZATION", "")
        if not auth_header.startswith(f"{self.keyword} "):
            return None
        token = auth_header.split(" ", 1)[1].strip()
        if not token:
            return None
        try:
            user = BusinessUser.objects.get(auth_token=token)
        except BusinessUser.DoesNotExist:
            raise AuthenticationFailed("Invalid or expired token.")
        return (user, token)
