from django.urls import path
from .views import SearchListCreate

urlpatterns = [
    path("", SearchListCreate.as_view(), name="search"),
]

