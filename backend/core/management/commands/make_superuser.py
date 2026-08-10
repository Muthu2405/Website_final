from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from core.models import User, Developer, Admin


class Command(BaseCommand):
    help = (
        "Grant superuser access to an account by email. Moves the account "
        "into the Admin table if it isn't already there, then sets "
        "is_superuser=True."
    )

    def add_arguments(self, parser):
        parser.add_argument("email", type=str)

    @transaction.atomic
    def handle(self, *args, **options):
        email = options["email"]

        admin = Admin.objects.filter(email=email).first()
        if admin is None:
            source = User.objects.filter(email=email).first() or Developer.objects.filter(email=email).first()
            if source is None:
                raise CommandError(f"No account found with email '{email}'.")
            admin = Admin.objects.create(
                name=source.name, email=source.email, phone=source.phone,
                username=source.username, password_hash=source.password_hash,
                auth_token=source.auth_token, created_at=source.created_at,
            )
            source.delete()

        if not admin.is_superuser:
            admin.is_superuser = True
            admin.save(update_fields=["is_superuser"])

        self.stdout.write(self.style.SUCCESS(f"{email} is now a superuser."))
