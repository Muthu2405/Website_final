from django.core.management.base import BaseCommand
from core.models import Service, Project, TeamMember, Testimonial, PricingPlan


class Command(BaseCommand):
    help = "Seed demo content matching the frontend's original placeholder data."

    def handle(self, *args, **options):
        if not Service.objects.exists():
            Service.objects.bulk_create([
                Service(icon="fa-globe", title="Website Development",
                    desc="Custom websites built with modern frameworks — responsive, fast, and SEO-friendly.",
                    tags=["React", "Django", "Tailwind"], price="$499", time="7-14 days", order=1),
                Service(icon="fa-layer-group", title="Web Application Development",
                    desc="Complex, data-driven web apps with robust backends and intuitive interfaces.",
                    tags=["React", "Django REST", "PostgreSQL"], price="$999", time="14-28 days", order=2),
            ])

        if not Testimonial.objects.exists():
            Testimonial.objects.bulk_create([
                Testimonial(name="Alice Johnson", role="Founder, TechStart",
                    text="Amazing work! They delivered beyond our expectations.",
                    highlight="delivered beyond our expectations", rating=5, order=1),
                Testimonial(name="Bob Williams", role="Creative Director, Creative Labs",
                    text="Great communication and quality delivery.",
                    highlight="quality delivery", rating=4, order=2),
            ])

        if not PricingPlan.objects.exists():
            PricingPlan.objects.bulk_create([
                PricingPlan(name="Basic", price="299", features="1 page, responsive, 1 revision",
                    desc="Simple and effective for small businesses.", order=1),
                PricingPlan(name="Standard", price="599", features="5 pages, responsive, 3 revisions, SEO",
                    desc="The perfect middle ground for growing businesses.", order=2),
                PricingPlan(name="Premium", price="999",
                    features="Unlimited pages, custom design, 10 revisions, SEO, hosting",
                    desc="Full-service package for businesses ready to scale.", order=3),
            ])

        self.stdout.write(self.style.SUCCESS("Demo data seeded."))
