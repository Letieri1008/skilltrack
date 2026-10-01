from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets

from .models import Brand, Equipment, EquipmentModel
from .serializers import BrandSerializer, EquipmentModelSerializer, EquipmentSerializer


class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all().order_by("name")
    serializer_class = BrandSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]


class EquipmentModelViewSet(viewsets.ModelViewSet):
    queryset = EquipmentModel.objects.select_related("brand").all().order_by("brand__name", "name")
    serializer_class = EquipmentModelSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["brand"]
    search_fields = ["name", "brand__name"]


class EquipmentViewSet(viewsets.ModelViewSet):
    queryset = Equipment.objects.select_related("brand", "equipment_model").all().order_by("asset_number")
    serializer_class = EquipmentSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["brand", "equipment_model", "status"]
    search_fields = ["asset_number", "serial_number", "location", "responsible_person"]
