from django.contrib import admin

# Register your models here.

from .models import Brand, Equipment, EquipmentModel

admin.site.register(Brand)
admin.site.register(EquipmentModel)
admin.site.register(Equipment)


