from django.db import models

# Create your models here.

from django.db import models


class Brand(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class EquipmentModel(models.Model):
    name = models.CharField(max_length=100)
    brand = models.ForeignKey(
        Brand,
        on_delete=models.PROTECT,
        related_name="equipment_models",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["brand", "name"],
                name="unique_equipment_model_per_brand",
            ),
        ]

    def __str__(self):
        return f"{self.brand.name} - {self.name}"


class Equipment(models.Model):
    class Status(models.TextChoices):
        AVAILABLE = "AVAILABLE", "Available"
        IN_USE = "IN_USE", "In use"
        UNDER_MAINTENANCE = "UNDER_MAINTENANCE", "Under maintenance"
        RETIRED = "RETIRED", "Retired"

    asset_number = models.CharField(max_length=100, unique=True)
    serial_number = models.CharField(max_length=100, unique=True)
    brand = models.ForeignKey(Brand, on_delete=models.PROTECT, related_name="equipment")
    equipment_model = models.ForeignKey(
        EquipmentModel,
        on_delete=models.PROTECT,
        related_name="equipment",
    )
    status = models.CharField(max_length=30, choices=Status.choices, default=Status.AVAILABLE)
    location = models.CharField(max_length=150, blank=True)
    responsible_person = models.CharField(max_length=150, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.asset_number} - {self.serial_number}"
