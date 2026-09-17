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