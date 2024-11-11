from django.contrib.auth.models import User
from rest_framework import serializers
import re

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}
    
    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}
        
class PasswordResetRequestSerializer(serializers.Serializer):
    """
    Serializer to validate email for password reset request.
    """
    email = serializers.EmailField()

class PasswordResetConfirmSerializer(serializers.Serializer):
    """
    Serializer to validate new password and token for reset confirmation.
    """
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(min_length=8, write_only=True)
    
    def validate_new_password(self, value):
        if not re.search(r'\d', value):  # Check for at least one digit
            raise serializers.ValidationError("Password must contain at least one digit.")
        if not re.search(r'[A-Z]', value):  # Check for at least one uppercase letter
            raise serializers.ValidationError("Password must contain at least one uppercase letter.")        
        return value
