from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SavedHDBViewSet, SavedSchoolViewSet, SavedPreschoolViewSet

router = DefaultRouter()
router.register(r'saved-hdbs', SavedHDBViewSet, basename='saved-hdbs')
router.register(r'saved-schools', SavedSchoolViewSet, basename='saved-schools')
router.register(r'saved-preschools', SavedPreschoolViewSet, basename='saved-preschools')

urlpatterns = [
    path('', include(router.urls)),
]