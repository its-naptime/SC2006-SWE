from django.contrib.auth.models import User
from rest_framework import serializers
import re

def validate_password_strength(value):
    """Shared function to validate password strength."""
    if not re.search(r'\d', value):  # Check for at least one digit
        raise serializers.ValidationError("Password must contain at least one digit.")
    if not re.search(r'[A-Z]', value):  # Check for at least one uppercase letter
        raise serializers.ValidationError("Password must contain at least one uppercase letter.")
    return value

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def to_representation(self, instance):
        """Customize the output representation"""
        representation = super().to_representation(instance)
        if self.context.get('include_auth_token'):
            representation['username'] = instance.username
        return representation
    
    def validate_email(self, value):
        """Ensure email is unique."""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate_password(self, value):
        """Validate password strength."""
        return validate_password_strength(value)
    
    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
        
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
        """Validate password strength."""
        return validate_password_strength(value)
