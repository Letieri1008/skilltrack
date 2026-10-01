from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("estoque", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Equipment",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("asset_number", models.CharField(max_length=100, unique=True)),
                ("serial_number", models.CharField(max_length=100, unique=True)),
                ("status", models.CharField(choices=[("AVAILABLE", "Available"), ("IN_USE", "In use"), ("UNDER_MAINTENANCE", "Under maintenance"), ("RETIRED", "Retired")], default="AVAILABLE", max_length=30)),
                ("location", models.CharField(blank=True, max_length=150)),
                ("responsible_person", models.CharField(blank=True, max_length=150)),
                ("notes", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("brand", models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name="equipment", to="estoque.brand")),
                ("equipment_model", models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name="equipment", to="estoque.equipmentmodel")),
            ],
        ),
    ]
