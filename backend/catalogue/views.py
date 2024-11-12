from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .models import SavedHDB, SavedSchool, SavedPreschool
from .serializers import SavedHDBSerializer, SavedSchoolSerializer, SavedPreschoolSerializer
from database.models import HDB_data, school_info, preschool_centre

class SavedHDBViewSet(viewsets.ModelViewSet):
    serializer_class = SavedHDBSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SavedHDB.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['post'])
    def toggle_save(self, request):
        hdb_id = request.data.get('hdb_id')
        if not hdb_id:
            return Response({'error': 'hdb_id is required'}, status=status.HTTP_400_BAD_REQUEST)

        hdb = get_object_or_404(HDB_data, id=hdb_id)
        saved_hdb = SavedHDB.objects.filter(user=request.user, hdb=hdb).first()

        if saved_hdb:
            saved_hdb.delete()
            return Response({'status': 'removed'}, status=status.HTTP_200_OK)
        else:
            SavedHDB.objects.create(user=request.user, hdb=hdb)
            return Response({'status': 'saved'}, status=status.HTTP_201_CREATED)

class SavedSchoolViewSet(viewsets.ModelViewSet):
    serializer_class = SavedSchoolSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SavedSchool.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['post'])
    def toggle_save(self, request):
        school_id = request.data.get('school_id')
        if not school_id:
            return Response({'error': 'school_id is required'}, status=status.HTTP_400_BAD_REQUEST)

        school = get_object_or_404(school_info, id=school_id)
        saved_school = SavedSchool.objects.filter(user=request.user, school=school).first()

        if saved_school:
            saved_school.delete()
            return Response({'status': 'removed'}, status=status.HTTP_200_OK)
        else:
            SavedSchool.objects.create(user=request.user, school=school)
            return Response({'status': 'saved'}, status=status.HTTP_201_CREATED)

class SavedPreschoolViewSet(viewsets.ModelViewSet):
    serializer_class = SavedPreschoolSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SavedPreschool.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['post'])
    def toggle_save(self, request):
        preschool_id = request.data.get('preschool_id')
        if not preschool_id:
            return Response({'error': 'preschool_id is required'}, status=status.HTTP_400_BAD_REQUEST)

        preschool = get_object_or_404(preschool_centre, id=preschool_id)
        saved_preschool = SavedPreschool.objects.filter(user=request.user, preschool=preschool).first()

        if saved_preschool:
            saved_preschool.delete()
            return Response({'status': 'removed'}, status=status.HTTP_200_OK)
        else:
            SavedPreschool.objects.create(user=request.user, preschool=preschool)
            return Response({'status': 'saved'}, status=status.HTTP_201_CREATED)