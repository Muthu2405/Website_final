from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from core.models import User, Developer, Admin


class Command(BaseCommand):
    help = (
        "Grant admin access to an account by email. If the account is "
        "currently a User or Developer, its row is moved into the Admin "
        "table (same email/password, new table). If it's already an "
        "Admin, this is a no-op."
    )

    def add_arguments(self, parser):
        parser.add_argument("email", type=str)

    @transaction.atomic
    def handle(self, *args, **options):
        email = options["email"]

        if Admin.objects.filter(email=email).exists():
            self.stdout.write(self.style.SUCCESS(f"{email} is already an admin."))
            return

        source = User.objects.filter(email=email).first() or Developer.objects.filter(email=email).first()
        if source is None:
            raise CommandError(f"No account found with email '{email}'.")

        Admin.objects.create(
            name=source.name, email=source.email, phone=source.phone,
            username=source.username, password_hash=source.password_hash,
            auth_token=source.auth_token, created_at=source.created_at,
        )
        source.delete()
        self.stdout.write(self.style.SUCCESS(f"{email} is now an admin."))
