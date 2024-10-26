from django.db import connections
from django.db.utils import OperationalError
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


@api_view(["GET", "OPTIONS"])  # Add OPTIONS to allowed methods
@permission_classes([AllowAny])
def health_check(request):
    """
    Basic health check endpoint that also verifies database connection
    """
    # Handle OPTIONS request for CORS preflight
    if request.method == "OPTIONS":
        response = HttpResponse()
        response["Access-Control-Allow-Origin"] = "http://localhost:3000"
        response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        response["Access-Control-Allow-Credentials"] = "true"
        return response

    # Check database connection
    db_healthy = True
    try:
        connections["default"].cursor()
    except OperationalError:
        db_healthy = False

    health_status = {
        "status": "ok",
        "database": "connected" if db_healthy else "disconnected",
        "environment": request.META.get("SERVER_NAME", "unknown"),
    }

    status_code = (
        status.HTTP_200_OK if db_healthy else status.HTTP_503_SERVICE_UNAVAILABLE
    )

    # Create response with CORS headers
    response = Response(health_status, status=status_code)
    response["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response["Access-Control-Allow-Credentials"] = "true"

    return response
