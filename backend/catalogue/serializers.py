from rest_framework import serializers
from .models import SavedHDB, SavedSchool, SavedPreschool
from database.models import HDB_data, school_info, preschool_centre, school_cca

class HDBSerializer(serializers.ModelSerializer):
    class Meta:
        model = HDB_data
        fields = '__all__'

class SchoolCCASerializer(serializers.ModelSerializer):
    class Meta:
        model = school_cca
        fields = '__all__'

class SchoolInfoSerializer(serializers.ModelSerializer):
    ccas = serializers.SerializerMethodField()
    
    class Meta:
        model = school_info
        fields = '__all__'
        
    def get_ccas(self, obj):
        ccas = school_cca.objects.filter(school_name=obj.school_name)
        return SchoolCCASerializer(ccas, many=True).data

class PreschoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = preschool_centre
        fields = '__all__'

class SavedHDBSerializer(serializers.ModelSerializer):
    hdb_details = HDBSerializer(source='hdb', read_only=True)
    
    class Meta:
        model = SavedHDB
        fields = ['id', 'hdb', 'hdb_details', 'saved_at', 'notes']
        read_only_fields = ['saved_at']

class SavedSchoolSerializer(serializers.ModelSerializer):
    school_details = SchoolInfoSerializer(source='school', read_only=True)
    
    class Meta:
        model = SavedSchool
        fields = ['id', 'school', 'school_details', 'saved_at', 'notes']
        read_only_fields = ['saved_at']

class SavedPreschoolSerializer(serializers.ModelSerializer):
    preschool_details = PreschoolSerializer(source='preschool', read_only=True)
    
    class Meta:
        model = SavedPreschool
        fields = ['id', 'preschool', 'preschool_details', 'saved_at', 'notes']
        read_only_fields = ['saved_at']