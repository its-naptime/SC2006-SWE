from django.urls import path
from . import views

urlpatterns = [
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
