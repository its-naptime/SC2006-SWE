from rest_framework import serializers
from database.models import UserSchoolSearch, UserPreschoolSearch, UserHDBSearch

class UserSchoolSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSchoolSearch
        fields = '__all__'

class UserPreschoolSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPreschoolSearch
        fields = '__all__'

class UserHDBSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserHDBSearch
        fields = '__all__'