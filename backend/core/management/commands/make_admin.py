from django.core.management.base import BaseCommand, CommandError

from core.models import BusinessUser


class Command(BaseCommand):
    help = "Grant admin access (is_admin=True) to a registered BusinessUser by email."

    def add_arguments(self, parser):
        parser.add_argument("email", type=str)

    def handle(self, *args, **options):
        email = options["email"]
        try:
            user = BusinessUser.objects.get(email=email)
        except BusinessUser.DoesNotExist:
            raise CommandError(f"No BusinessUser found with email '{email}'.")

        user.is_admin = True
        user.save(update_fields=["is_admin"])
        self.stdout.write(self.style.SUCCESS(f"{email} is now an admin."))
