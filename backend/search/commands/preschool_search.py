from typing import Any, Dict

from database.models import preschool_centre
from database.serializers import PreschoolCentreSerializer

from .base import SearchCommand


class PreschoolSearchCommand(SearchCommand):
    def __init__(self, params: Dict[str, Any]):
        self.params = params
        self.queryset = preschool_centre.objects.all()
        self.serializer_class = PreschoolCentreSerializer

    def execute(self) -> Dict[str, Any]:
        queryset = self.queryset

        # Location filter (postal code)
        if self.params.get("postal_codes"):
            queryset = queryset.filter(postal_code__in=self.params["postal_codes"])

        # Vacancy filters
        level = self.params.get("level")  # infant, pg, n1, n2, k1, k2
        if level:
            vacancy_field = f"{level}_vacancy_current_month"
            queryset = queryset.exclude(**{vacancy_field: "0"})

        # Service model filter
        if self.params.get("service_models"):
            queryset = queryset.filter(service_model__in=self.params["service_models"])

        # Language filter
        if self.params.get("second_language"):
            queryset = queryset.filter(
                second_languages_offered__icontains=self.params["second_language"]
            )

        # Additional filters
        if self.params.get("spark_certified"):
            queryset = queryset.filter(spark_certified="Yes")

        if self.params.get("transport_required"):
            queryset = queryset.filter(provision_of_transport="Yes")

        serializer = self.serializer_class(queryset, many=True)

        # Paginate the serialized data
        paginated_data = self.paginate_queryset(serializer.data)

        return {**paginated_data, "type": "preschool"}
