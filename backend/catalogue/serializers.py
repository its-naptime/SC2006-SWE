from rest_framework import serializers
from .models import SavedHDB, SavedSchool, SavedPreschool
from database.models import HDB_data, school_info, preschool_centre

class SavedHDBSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedHDB
        fields = ['id', 'hdb', 'saved_at', 'notes']
        read_only_fields = ['saved_at']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['hdb_details'] = {
            'block': instance.hdb.block,
            'street_name': instance.hdb.street_name,
            'town': instance.hdb.town,
            'flat_type': instance.hdb.flat_type,
            'resale_price': str(instance.hdb.resale_price),
            'floor_area_sqm': str(instance.hdb.floor_area_sqm),
            'latitude': instance.hdb.latitude,
            'longitude': instance.hdb.longitude,
        }
        return representation

class SavedSchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedSchool
        fields = ['id', 'school', 'saved_at', 'notes']
        read_only_fields = ['saved_at']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['school_details'] = {
            'school_name': instance.school.school_name,
            'address': instance.school.address,
            'postal_code': instance.school.postal_code,
            'telephone_no': instance.school.telephone_no,
            'email_address': instance.school.email_address,
            'latitude': instance.school.latitude,
            'longitude': instance.school.longitude,
        }
        return representation

class SavedPreschoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedPreschool
        fields = ['id', 'preschool', 'saved_at', 'notes']
        read_only_fields = ['saved_at']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['preschool_details'] = {
            'centre_name': instance.preschool.centre_name,
            'centre_address': instance.preschool.centre_address,
            'postal_code': instance.preschool.postal_code,
            'centre_contact_no': instance.preschool.centre_contact_no,
            'centre_email_address': instance.preschool.centre_email_address,
            'latitude': instance.preschool.latitude,
            'longitude': instance.preschool.longitude,
        }
        return representation