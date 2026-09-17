from django.contrib import admin

# Register your models here.

from .models import Brand, EquipmentModel

admin.site.register(Brand)
admin.site.register(EquipmentModel)


