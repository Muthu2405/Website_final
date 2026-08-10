from django.db import models
from django.contrib.auth.hashers import make_password, check_password


class Service(models.Model):
    icon = models.CharField(max_length=50, blank=True, default="fa-cog")
    title = models.CharField(max_length=200)
    desc = models.TextField(blank=True)
    tags = models.JSONField(default=list, blank=True)
    price = models.CharField(max_length=50, blank=True)
    time = models.CharField(max_length=50, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title


class Project(models.Model):
    title = models.CharField(max_length=200)
    desc = models.TextField(blank=True)
    long_desc = models.TextField(blank=True)
    tags = models.JSONField(default=list, blank=True)
    img = models.URLField(blank=True, max_length=500)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title


class TeamMember(models.Model):
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200, blank=True)
    skills = models.CharField(max_length=300, blank=True)
    experience = models.CharField(max_length=50, blank=True)
    bio = models.TextField(blank=True)
    photo = models.URLField(blank=True, max_length=500)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.name


class Testimonial(models.Model):
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200, blank=True)
    text = models.TextField(blank=True)
    highlight = models.CharField(max_length=200, blank=True)
    image = models.URLField(blank=True, max_length=500)
    rating = models.PositiveSmallIntegerField(default=5)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.name


class PricingPlan(models.Model):
    name = models.CharField(max_length=100)
    price = models.CharField(max_length=50)
    features = models.TextField(blank=True)
    desc = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.name


class Account(models.Model):
    """Shared identity/auth fields for every account table (User, Developer, Admin).
    Each concrete subclass gets its own DB table — this class itself is abstract."""
    name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=30, blank=True)

    username = models.CharField(max_length=100, blank=True)
    password_hash = models.CharField(max_length=255)
    auth_token = models.CharField(max_length=64, blank=True, db_index=True)
    # Set when an admin creates this account on the account holder's behalf
    # (e.g. admin-added developers) with a temporary password. The holder
    # is required to set their own password on first login.
    must_change_password = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True

    def set_password(self, raw_password):
        self.password_hash = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password_hash)

    # DRF's IsAuthenticated permission (and other auth-aware code) checks
    # these attributes. These models aren't Django's auth User, so they're
    # not present by default — if we've reached here via
    # AccountTokenAuthentication, the token was already validated, so this
    # account is authenticated.
    @property
    def is_authenticated(self):
        return True

    @property
    def is_anonymous(self):
        return False

    def __str__(self):
        return self.email


class User(Account):
    """Regular registered business user. Mirrors the signup shape from
    onboarding.script.js / SignupFlow.jsx."""
    referral = models.CharField(max_length=100, blank=True)
    role = models.CharField(max_length=50, blank=True)

    business = models.CharField(max_length=200, blank=True)
    type = models.CharField(max_length=100, blank=True)
    category = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=200, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    pincode = models.CharField(max_length=20, blank=True)
    website = models.URLField(blank=True, max_length=300)

    agree_marketing = models.BooleanField(default=False)
    planet_id = models.CharField(max_length=50, blank=True)


class Developer(Account):
    """Developer account — separate table from regular business Users."""
    skills = models.CharField(max_length=300, blank=True)
    github_url = models.URLField(blank=True, max_length=300)
    portfolio_url = models.URLField(blank=True, max_length=300)
    bio = models.TextField(blank=True)


class Admin(Account):
    """Admin/superuser account — separate table from Users and Developers."""
    # Superusers can do everything an admin can, plus manage other accounts'
    # admin/superuser status. Regular admins can only view the account list.
    is_superuser = models.BooleanField(default=False)

    # Every row in this table is an admin by definition.
    @property
    def is_admin(self):
        return True


# Every account model that can log in, keyed by the "account_type" string
# used in the API (signup payload, login lookup, etc).
ACCOUNT_MODELS = {"user": User, "developer": Developer, "admin": Admin}
