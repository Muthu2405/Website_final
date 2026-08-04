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


class BusinessUser(models.Model):
    """Mirrors the signup shape from onboarding.script.js / SignupFlow.jsx"""
    name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=30, blank=True)
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

    username = models.CharField(max_length=100, blank=True)
    password_hash = models.CharField(max_length=255)
    agree_marketing = models.BooleanField(default=False)
    planet_id = models.CharField(max_length=50, blank=True)
    auth_token = models.CharField(max_length=64, blank=True, db_index=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def set_password(self, raw_password):
        self.password_hash = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password_hash)

    def __str__(self):
        return self.email
