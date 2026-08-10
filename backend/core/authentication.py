from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .models import User, Developer, Admin

# Order matters only for lookup speed; a token is unique per row across all
# three tables since each is generated with secrets.token_hex(24).
ACCOUNT_TABLES = (User, Developer, Admin)


class AccountTokenAuthentication(BaseAuthentication):
    """
    Simple 'Authorization: Token <token>' scheme backed by the auth_token
    column on whichever of User / Developer / Admin holds it. Not full
    Django auth — matches the lightweight signup/login flow this frontend
    already has.
    """

    keyword = "Token"

    def authenticate(self, request):
        auth_header = request.META.get("HTTP_AUTHORIZATION", "")
        if not auth_header.startswith(f"{self.keyword} "):
            return None
        token = auth_header.split(" ", 1)[1].strip()
        if not token:
            return None

        for model in ACCOUNT_TABLES:
            try:
                account = model.objects.get(auth_token=token)
            except model.DoesNotExist:
                continue
            return (account, token)

        raise AuthenticationFailed("Invalid or expired token.")
