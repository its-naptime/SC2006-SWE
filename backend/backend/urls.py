"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from database import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('database.urls')),
    path('api/hdb_data/', views.HDBDataListCreate.as_view()),
    path('api/hdb_data/<int:pk>/', views.HDBDataDetail.as_view()),
    path('api/school_info/', views.SchoolInfoListCreate.as_view()),
    path('api/school_info/<int:pk>/', views.SchoolInfoDetail.as_view()),
    path('api/school_cca/', views.SchoolCcaListCreate.as_view()),
    path('api/school_cca/<int:pk>/', views.SchoolCcaDetail.as_view()),
    path('api/preschool_centre/', views.PreschoolCentreListCreate.as_view()),
    path('api/preschool_centre/<int:pk>/', views.PreschoolCentreDetail.as_view()),
    path('api/preschool_charges/', views.PreschoolChargesListCreate.as_view()),
    path('api/preschool_charges/<int:pk>/', views.PreschoolChargesDetail.as_view()),
]
