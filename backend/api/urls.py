from django.urls import path
from .views import RequestPasswordResetView

urlpatterns = [
        path('api/user/reset-password/', RequestPasswordResetView.as_view(), name='password-reset-request'),

]
