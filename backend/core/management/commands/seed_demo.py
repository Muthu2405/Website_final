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
                PricingPlan(name="Starter", price="4,999",
                    features="1–3 pages, Responsive design, Contact form, Basic SEO, Basic animations, Deployment included, 7-day support",
                    desc="A focused, budget-friendly site to get your business online fast.", order=1),
                PricingPlan(name="Business", price="14,999",
                    features="Up to 7 pages, Responsive design, Contact form, Basic SEO, Advanced animations, Admin panel, Basic backend/API, Database included, Deployment included, 30-day support",
                    desc="Our most popular plan — a fuller site with an admin panel and basic backend.", order=2),
                PricingPlan(name="Premium", price="29,999+",
                    features="10–15+ pages, Responsive design, Contact form, Advanced SEO, Custom animations, Admin panel, Advanced backend/API, Database included, Deployment included, 60-day support",
                    desc="A full-scale build with advanced backend, SEO, and custom animations.", order=3),
            ])

        self.stdout.write(self.style.SUCCESS("Demo data seeded."))
