from rest_framework import serializers
from . import models

class HDBDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.HDB_data
        fields = '__all__'
class SchoolCCASerializer(serializers.ModelSerializer):
    class Meta:
        model = models.school_cca
        fields = ['school_section', 'cca_grouping_desc', 'cca_generic_name', 'cca_customized_name']

class SchoolInfoSerializer(serializers.ModelSerializer):
    ccas = serializers.SerializerMethodField()

    class Meta:
        model = models.school_info
        fields = '__all__'  # Includes all fields from school_info plus our custom ccas field

    def get_ccas(self, obj):
        # Get all CCAs for this school
        ccas = models.school_cca.objects.filter(school_name=obj.school_name)
        return SchoolCCASerializer(ccas, many=True).data
    
class PreschoolCentreSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.preschool_centre
        fields = '__all__'
class PreschoolChargesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.preschool_charges
        fields = '__all__'
# class UserSchoolSearchSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.UserSchoolSearch
#         fields = '__all__'
# class UserPreschoolSearchSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.UserPreschoolSearch
#         fields = '__all__'
# class UserHDBSearchSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.UserHDBSearch
#         fields = '__all__'
# class ReviewSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.Review
#         fields = '__all__'
# class PlaceSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.Place
#         fields = '__all__'
