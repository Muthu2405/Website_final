# Generated migration: split the single BusinessUser table into three
# separate tables (User, Developer, Admin) sharing the same database.

import django.db.models.deletion
from django.db import migrations, models


def copy_business_users_forward(apps, schema_editor):
    """Move existing BusinessUser rows into User (regular accounts) or
    Admin (accounts that had is_admin/is_superuser set). There's no prior
    concept of a Developer account, so none are created here."""
    BusinessUser = apps.get_model("core", "BusinessUser")
    User = apps.get_model("core", "User")
    Admin = apps.get_model("core", "Admin")

    for bu in BusinessUser.objects.all():
        if getattr(bu, "is_admin", False) or getattr(bu, "is_superuser", False):
            Admin.objects.create(
                name=bu.name, email=bu.email, phone=bu.phone,
                username=bu.username, password_hash=bu.password_hash,
                auth_token=bu.auth_token, is_superuser=bu.is_superuser,
                created_at=bu.created_at,
            )
        else:
            User.objects.create(
                name=bu.name, email=bu.email, phone=bu.phone,
                username=bu.username, password_hash=bu.password_hash,
                auth_token=bu.auth_token,
                referral=bu.referral, role=bu.role, business=bu.business,
                type=bu.type, category=bu.category, location=bu.location,
                city=bu.city, state=bu.state, country=bu.country,
                pincode=bu.pincode, website=bu.website,
                agree_marketing=bu.agree_marketing, planet_id=bu.planet_id,
                created_at=bu.created_at,
            )


def copy_business_users_backward(apps, schema_editor):
    BusinessUser = apps.get_model("core", "BusinessUser")
    User = apps.get_model("core", "User")
    Admin = apps.get_model("core", "Admin")

    for u in User.objects.all():
        BusinessUser.objects.create(
            name=u.name, email=u.email, phone=u.phone, username=u.username,
            password_hash=u.password_hash, auth_token=u.auth_token,
            referral=u.referral, role=u.role, business=u.business,
            type=u.type, category=u.category, location=u.location,
            city=u.city, state=u.state, country=u.country, pincode=u.pincode,
            website=u.website, agree_marketing=u.agree_marketing,
            planet_id=u.planet_id, is_admin=False, is_superuser=False,
            created_at=u.created_at,
        )
    for a in Admin.objects.all():
        BusinessUser.objects.create(
            name=a.name, email=a.email, phone=a.phone, username=a.username,
            password_hash=a.password_hash, auth_token=a.auth_token,
            is_admin=True, is_superuser=a.is_superuser, created_at=a.created_at,
        )


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0003_businessuser_is_superuser"),
    ]

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=200)),
                ("email", models.EmailField(max_length=254, unique=True)),
                ("phone", models.CharField(blank=True, max_length=30)),
                ("username", models.CharField(blank=True, max_length=100)),
                ("password_hash", models.CharField(max_length=255)),
                ("auth_token", models.CharField(blank=True, db_index=True, max_length=64)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("referral", models.CharField(blank=True, max_length=100)),
                ("role", models.CharField(blank=True, max_length=50)),
                ("business", models.CharField(blank=True, max_length=200)),
                ("type", models.CharField(blank=True, max_length=100)),
                ("category", models.CharField(blank=True, max_length=100)),
                ("location", models.CharField(blank=True, max_length=200)),
                ("city", models.CharField(blank=True, max_length=100)),
                ("state", models.CharField(blank=True, max_length=100)),
                ("country", models.CharField(blank=True, max_length=100)),
                ("pincode", models.CharField(blank=True, max_length=20)),
                ("website", models.URLField(blank=True, max_length=300)),
                ("agree_marketing", models.BooleanField(default=False)),
                ("planet_id", models.CharField(blank=True, max_length=50)),
            ],
            options={"abstract": False},
        ),
        migrations.CreateModel(
            name="Developer",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=200)),
                ("email", models.EmailField(max_length=254, unique=True)),
                ("phone", models.CharField(blank=True, max_length=30)),
                ("username", models.CharField(blank=True, max_length=100)),
                ("password_hash", models.CharField(max_length=255)),
                ("auth_token", models.CharField(blank=True, db_index=True, max_length=64)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("skills", models.CharField(blank=True, max_length=300)),
                ("github_url", models.URLField(blank=True, max_length=300)),
                ("portfolio_url", models.URLField(blank=True, max_length=300)),
                ("bio", models.TextField(blank=True)),
            ],
            options={"abstract": False},
        ),
        migrations.CreateModel(
            name="Admin",
            fields=[
                ("id", models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=200)),
                ("email", models.EmailField(max_length=254, unique=True)),
                ("phone", models.CharField(blank=True, max_length=30)),
                ("username", models.CharField(blank=True, max_length=100)),
                ("password_hash", models.CharField(max_length=255)),
                ("auth_token", models.CharField(blank=True, db_index=True, max_length=64)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("is_superuser", models.BooleanField(default=False)),
            ],
            options={"abstract": False},
        ),
        migrations.RunPython(copy_business_users_forward, copy_business_users_backward),
        migrations.DeleteModel(name="BusinessUser"),
    ]
