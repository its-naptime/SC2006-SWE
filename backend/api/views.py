from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissons import IsAuthenticated, AllowAny

# Create your own views here
class createUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = User
    Permission_classes = [AllowAny]
