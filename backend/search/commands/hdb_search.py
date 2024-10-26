from typing import Any, Dict

from database.models import HDB_data
from database.serializers import HDBDataSerializer

from .base import SearchCommand


class HDBSearchCommand(SearchCommand):
    def __init__(self, params: Dict[str, Any], page: int = 1, page_size: int = 10):
        super().__init__(params, page, page_size)  # Call parent's init
        self.queryset = HDB_data.objects.all()
        self.serializer_class = HDBDataSerializer

    def execute(self) -> Dict[str, Any]:
        queryset = self.queryset

        # Price range filter
        if self.params.get("min_price"):
            queryset = queryset.filter(resale_price__gte=self.params["min_price"])
        if self.params.get("max_price"):
            queryset = queryset.filter(resale_price__lte=self.params["max_price"])

        # Location filter
        if self.params.get("towns"):
            queryset = queryset.filter(town__in=self.params["towns"])

        # Flat type filter
        if self.params.get("flat_types"):
            queryset = queryset.filter(flat_type__in=self.params["flat_types"])

        # Floor area filter
        if self.params.get("min_area"):
            queryset = queryset.filter(floor_area_sqm__gte=self.params["min_area"])
        if self.params.get("max_area"):
            queryset = queryset.filter(floor_area_sqm__lte=self.params["max_area"])

        # Model filter
        if self.params.get("flat_models"):
            queryset = queryset.filter(flat_model__in=self.params["flat_models"])

        # Sorting
        sort_by = self.params.get("sort_by", "-resale_price")
        queryset = queryset.order_by(sort_by)

        # Get paginated data
        paginated_data = self.paginate_queryset(queryset)
        return {**paginated_data, "type": "hdb"}
