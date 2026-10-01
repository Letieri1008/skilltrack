from rest_framework.routers import DefaultRouter

from .views import BrandViewSet, EquipmentModelViewSet, EquipmentViewSet

router = DefaultRouter()
router.register("brands", BrandViewSet, basename="brand")
router.register("models", EquipmentModelViewSet, basename="equipment-model")
router.register("equipment", EquipmentViewSet, basename="equipment")

urlpatterns = router.urls
