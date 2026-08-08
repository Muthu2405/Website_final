from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0004_split_businessuser_into_user_developer_admin"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="must_change_password",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="developer",
            name="must_change_password",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="admin",
            name="must_change_password",
            field=models.BooleanField(default=False),
        ),
    ]
