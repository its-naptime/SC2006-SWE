from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics
from . import models
from . import serializers

class HDBDataListCreate(generics.ListCreateAPIView):
    queryset = models.HDB_data.objects.all()
    serializer_class = serializers.HDBDataSerializer

class HDBDataDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.HDB_data.objects.all()
    serializer_class = serializers.HDBDataSerializer

class SchoolInfoListCreate(generics.ListCreateAPIView):
    queryset = models.school_info.objects.all()
    serializer_class = serializers.SchoolInfoSerializer

class SchoolInfoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.school_info.objects.all()
    serializer_class = serializers.SchoolInfoSerializer

class SchoolCcaListCreate(generics.ListCreateAPIView):
    queryset = models.school_cca.objects.all()
    serializer_class = serializers.SchoolCcaSerializer

class SchoolCcaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.school_cca.objects.all()
    serializer_class = serializers.SchoolCcaSerializer

class PreschoolCentreListCreate(generics.ListCreateAPIView):
    queryset = models.preschool_centre.objects.all()
    serializer_class = serializers.PreschoolCentreSerializer

class PreschoolCentreDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.preschool_centre.objects.all()
    serializer_class = serializers.PreschoolCentreSerializer

class PreschoolChargesListCreate(generics.ListCreateAPIView):
    queryset = models.preschool_charges.objects.all()
    serializer_class = serializers.PreschoolChargesSerializer

class PreschoolChargesDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.preschool_charges.objects.all()
    serializer_class = serializers.PreschoolChargesSerializer
