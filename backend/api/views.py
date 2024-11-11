
from django.contrib.auth.models import User
from django.shortcuts import render
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str

from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response


from .serializers import UserSerializer, PasswordResetRequestSerializer, PasswordResetConfirmSerializer
from .utils import send_password_reset_email

token_generator = PasswordResetTokenGenerator()


# Create your own views here
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class RequestPasswordResetView(APIView):
    """
    View to handle password reset request.
    """
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.filter(email=serializer.validated_data['email']).first()
            if user:
                # Generate a password reset token
                send_password_reset_email(user)
                return Response({'message': 'Password reset email sent.'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetConfirmView(APIView):
    """
    View to handle password reset confirmation.
    """
    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            try:
                uid = force_str(urlsafe_base64_decode(serializer.validated_data['uid']))
                user = User.objects.get(pk=uid)
                
                # Check if token is valid
                if token_generator.check_token(user, serializer.validated_data['token']):
                    # Set new password
                    user.set_password(serializer.validated_data['new_password'])
                    user.save()
                    return Response({'message': 'Password has been reset successfully.'}, status=status.HTTP_200_OK)
                return Response({'message': 'Invalid or expired token.'}, status=status.HTTP_400_BAD_REQUEST)
            except (TypeError, ValueError, OverflowError, User.DoesNotExist):
                return Response({'message': 'Invalid token or user.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
