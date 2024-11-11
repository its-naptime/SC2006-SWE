from django.urls import path
from .views import SearchListCreate, NearbySearchView

urlpatterns = [
    path('', SearchListCreate.as_view(), name='search'),
    path('nearby/', NearbySearchView.as_view(), name='nearby-search')
]