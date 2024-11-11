from typing import Any, Dict
from django.db.models import Q
from database.models import HDB_data
from database.serializers import HDBDataSerializer
from .base import SearchCommand

class HDBSearchCommand(SearchCommand):
    def __init__(self, params: Dict[str, Any], page: int = 1, page_size: int = 10):
        super().__init__(params, page, page_size)
        self.queryset = HDB_data.objects.all()
        self.serializer_class = HDBDataSerializer

    def execute(self) -> Dict[str, Any]:
        queryset = self.queryset

        # Text search
        search_query = self.params.get("search")
        if search_query:
            queryset = queryset.filter(
                Q(street_name__icontains=search_query) |
                Q(town__icontains=search_query) |
                Q(flat_type__icontains=search_query)
            )

        # Price range filter
        if self.params.get("minPrice"):
            queryset = queryset.filter(resale_price__gte=self.params["minPrice"])
        if self.params.get("maxPrice"):
            queryset = queryset.filter(resale_price__lte=self.params["maxPrice"])

        # Location filter
        if self.params.get("towns"):
            towns = self.params["towns"]
            if isinstance(towns, str):
                towns = [towns]
            queryset = queryset.filter(town__in=towns)

        # Flat type filter
        if self.params.get("flatTypes"):
            flat_types = self.params["flatTypes"]
            if isinstance(flat_types, str):
                flat_types = [flat_types]
            queryset = queryset.filter(flat_type__in=flat_types)

        # Floor area filter
        if self.params.get("minArea"):
            queryset = queryset.filter(floor_area_sqm__gte=self.params["minArea"])
        if self.params.get("maxArea"):
            queryset = queryset.filter(floor_area_sqm__lte=self.params["maxArea"])

        # Sorting
        sort_by = self.params.get("sort", "-resale_price")
        queryset = queryset.order_by(sort_by)

        # Get paginated data
        page = int(self.params.get("page", 1))
        page_size = int(self.params.get("page_size", 10))
        
        start = (page - 1) * page_size
        end = start + page_size
        
        total = queryset.count()
        results = queryset[start:end]
        
        serializer = self.serializer_class(results, many=True)
        
        return {
            "results": serializer.data,
            "total": total,
            "page": page,
            "page_size": page_size,
            "total_pages": (total + page_size - 1) // page_size,
            "type": "hdb"
        }