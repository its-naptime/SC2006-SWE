from rest_framework import serializers
from . import models

class HDBDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.HDB_data
        fields = '__all__'
class SchoolInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.school_info
        fields = '__all__'
class SchoolCcaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.school_cca
        fields = '__all__'
class PreschoolCentreSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.preschool_centre
        fields = '__all__'
class PreschoolChargesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.preschool_charges
        fields = '__all__'
class UserSchoolSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserSchoolSearch
        fields = '__all__'
class UserPreschoolSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserPreschoolSearch
        fields = '__all__'
class UserHDBSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserHDBSearch
        fields = '__all__'
