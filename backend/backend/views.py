from django.db import connections
from django.db.utils import OperationalError
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def health_check(request):
    """
    Basic health check endpoint that also verifies database connection
    """
    # Check database connection
    db_healthy = True
    try:
        # Attempt to connect to the database
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
    return Response(health_status, status=status_code)
