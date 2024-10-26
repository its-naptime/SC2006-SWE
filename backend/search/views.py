# search/views.py
from rest_framework import generics, status
from rest_framework.response import Response

from .services.search_service import SearchService

# from rest_framework.permissions import IsAuthenticated  # if you need auth


class SearchListCreate(generics.ListCreateAPIView):
    # permission_classes = [IsAuthenticated]  # if you need auth

    def get_queryset(self):
        """
        Not used for searching but required by ListCreateAPIView.
        Our search uses the SearchService instead.
        """
        return []

    def list(self, request, *args, **kwargs):
        """Handle GET request - return search metadata"""
        return Response(
            {
                "available_search_types": ["hdb", "school", "preschool"],
                "parameters": {
                    "hdb": {
                        "min_price": "number",
                        "max_price": "number",
                        "towns": "list of strings",
                        "flat_types": "list of strings",
                    },
                    "school": {
                        "zones": "list of strings",
                        "mainlevel": "string",
                        "cca": "string",
                    },
                    "preschool": {
                        "postal_codes": "list of strings",
                        "level": "string (infant/pg/n1/n2/k1/k2)",
                    },
                },
            }
        )

    def create(self, request, *args, **kwargs):
        """Handle POST request - perform search"""
        try:
            query_type = request.data.get("query_type")
            if not query_type:
                return Response(
                    {"error": "query_type is required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            service = SearchService()
            results = service.execute_search(query_type, request.data)

            return Response(results)

        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"Search error: {str(e)}")  # for debugging
            return Response(
                {"error": "An unexpected error occurred"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
