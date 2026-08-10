from django.db import migrations


NEW_PLANS = [
    {
        "name": "Starter", "price": "4,999",
        "features": "1–3 pages, Responsive design, Contact form, Basic SEO, Basic animations, Deployment included, 7-day support",
        "desc": "A focused, budget-friendly site to get your business online fast.",
        "order": 1,
    },
    {
        "name": "Business", "price": "14,999",
        "features": "Up to 7 pages, Responsive design, Contact form, Basic SEO, Advanced animations, Admin panel, Basic backend/API, Database included, Deployment included, 30-day support",
        "desc": "Our most popular plan — a fuller site with an admin panel and basic backend.",
        "order": 2,
    },
    {
        "name": "Premium", "price": "29,999+",
        "features": "10–15+ pages, Responsive design, Contact form, Advanced SEO, Custom animations, Admin panel, Advanced backend/API, Database included, Deployment included, 60-day support",
        "desc": "A full-scale build with advanced backend, SEO, and custom animations.",
        "order": 3,
    },
]


def replace_pricing_forward(apps, schema_editor):
    PricingPlan = apps.get_model("core", "PricingPlan")
    # This table has only ever held the three top-level tiers — replace
    # whatever's there (old placeholder $ pricing) with the real ₹ pricing.
    PricingPlan.objects.all().delete()
    for plan in NEW_PLANS:
        PricingPlan.objects.create(**plan)


def replace_pricing_backward(apps, schema_editor):
    PricingPlan = apps.get_model("core", "PricingPlan")
    PricingPlan.objects.all().delete()
    PricingPlan.objects.bulk_create([
        PricingPlan(name="Basic", price="299", features="1 page, responsive, 1 revision",
                     desc="Simple and effective for small businesses.", order=1),
        PricingPlan(name="Standard", price="599", features="5 pages, responsive, 3 revisions, SEO",
                     desc="The perfect middle ground for growing businesses.", order=2),
        PricingPlan(name="Premium", price="999",
                     features="Unlimited pages, custom design, 10 revisions, SEO, hosting",
                     desc="Full-service package for businesses ready to scale.", order=3),
    ])


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0005_account_must_change_password"),
    ]

    operations = [
        migrations.RunPython(replace_pricing_forward, replace_pricing_backward),
    ]
