from rest_framework import serializers

from .models import Brand, Equipment, EquipmentModel


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ["id", "name", "created_at"]
        read_only_fields = ["id", "created_at"]


class EquipmentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = EquipmentModel
        fields = ["id", "name", "brand", "created_at"]
        read_only_fields = ["id", "created_at"]


class EquipmentSerializer(serializers.ModelSerializer):
    brand_name = serializers.CharField(source="brand.name", read_only=True)
    model_name = serializers.CharField(source="equipment_model.name", read_only=True)

    class Meta:
        model = Equipment
        fields = [
            "id", "asset_number", "serial_number", "brand", "brand_name",
            "equipment_model", "model_name", "status", "location",
            "responsible_person", "notes", "created_at", "updated_at",
        ]
        read_only_fields = ["id", "brand_name", "model_name", "created_at", "updated_at"]

    def validate(self, attrs):
        brand = attrs.get("brand", getattr(self.instance, "brand", None))
        equipment_model = attrs.get(
            "equipment_model",
            getattr(self.instance, "equipment_model", None),
        )
        if brand and equipment_model and equipment_model.brand_id != brand.id:
            raise serializers.ValidationError(
                {"equipment_model": "The selected model does not belong to the selected brand."}
            )
        return attrs
