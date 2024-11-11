from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'user_school_searches', views.UserSchoolSearchView)
router.register(r'user_preschool_searches', views.UserPreschoolSearchView)
router.register(r'user_hdb_searches', views.UserHDBSearchView)


urlpatterns = [
    path('user_school_searches/', views.user_school_search_list, name='user_school_search_list'),
    path('user_school_searches/create/', views.user_school_search_create, name='user_school_search_create'),
    path('user_school_searches/<int:pk>/', views.user_school_search_detail, name='user_school_search_detail'),
    path('user_preschool_searches/', views.user_preschool_search_list, name='user_preschool_search_list'),
    path('user_preschool_searches/create/', views.user_preschool_search_create, name='user_preschool_search_create'),
    path('user_preschool_searches/<int:pk>/', views.user_preschool_search_detail, name='user_preschool_search_detail'),
    path('user_hdb_searches/', views.user_hdb_search_list, name='user_hdb_search_list'),
    path('user_hdb_searches/create/', views.user_hdb_search_create, name='user_hdb_search_create'),
    path('user_hdb_searches/<int:pk>/', views.user_hdb_search_detail, name='user_hdb_search_detail'),
    path('user_hdb_searches/<int:pk>/delete/', views.user_hdb_search_delete, name='user_hdb_search_delete'),
    path('user_preschool_searches/<int:pk>/delete/', views.user_preschool_search_delete, name='user_preschool_search_delete'),
    path('user_school_searches/<int:pk>/delete/', views.user_school_search_delete, name='user_school_search_delete'),
    path('', include(router.urls)),
]