from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.models import User

# Initialize the token generator
token_generator = PasswordResetTokenGenerator()

def generate_password_reset_token(user):
    """
    Generate a password reset token for a user and encode the user's ID.
    """
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = token_generator.make_token(user)
    return uid, token

def send_password_reset_email(user):
    """
    Send a password reset email to the user with a link containing the token.
    """
    uid, token = generate_password_reset_token(user)
    
    # Construct the reset URL
    reset_url = f"localhost:3000/ResetPassword?uid={uid}&token={token}"
    
    # Send the email
    send_mail(
        subject='Password Reset Request',
        message=f'Please click the link below to reset your password:\n{reset_url}',
        from_email='jordanhui80@gmail.com',
        recipient_list=[user.email],
        fail_silently=False,
    )
