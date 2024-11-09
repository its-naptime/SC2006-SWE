# search/views.py
from rest_framework import generics, status
from rest_framework.response import Response
from .services.search_service import SearchService
from rest_framework.pagination import PageNumberPagination

class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class SearchListCreate(generics.ListCreateAPIView):
    pagination_class = CustomPagination

    def get_queryset(self):
        """
        Not used for searching but required by ListCreateAPIView.
        Our search uses the SearchService instead.
        """
        return []

    def list(self, request, *args, **kwargs):
        """Handle GET request - return search metadata"""
        return Response({
            "available_search_types": ["hdb", "school", "preschool"],
            "parameters": {
                "hdb": {
                    "min_price": "number",
                    "max_price": "number",
                    "towns": "list of strings",
                    "flat_types": "list of strings",
                    "min_area": "number",
                    "max_area": "number",
                    "search": "string",
                    "sort": "string",
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
        })

    def create(self, request, *args, **kwargs):
        """Handle POST request - perform search"""
        try:
            query_type = request.data.get("query_type")
            if not query_type:
                return Response(
                    {"error": "query_type is required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Get page parameters
            page = int(request.data.get('page', 1))
            page_size = int(request.data.get('page_size', self.pagination_class.page_size))

            # Initialize search service
            service = SearchService()
            
            # Execute search with pagination
            results = service.execute_search(
                query_type=query_type,
                search_params=request.data,
                page=page,
                page_size=page_size
            )

            return Response(results)

        except ValueError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            print(f"Search error: {str(e)}")  # for debugging
            return Response(
                {"error": "An unexpected error occurred"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )