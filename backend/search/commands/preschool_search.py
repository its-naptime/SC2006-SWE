# commands/preschool_search.py
from typing import Any, Dict
from database.models import preschool_centre
from database.serializers import PreschoolCentreSerializer
from django.db.models import Q
from .base import SearchCommand

class PreschoolSearchCommand(SearchCommand):
    def __init__(self, params: Dict[str, Any], page: int = 1, page_size: int = 10):
        super().__init__(params, page, page_size)
        self.params = params
        self.queryset = preschool_centre.objects.all()
        self.serializer_class = PreschoolCentreSerializer
        print("Preschool search initialized with params:", params)

    def execute(self) -> Dict[str, Any]:
        try:
            print("Starting preschool search execution")
            queryset = self.queryset
            
            search_query = self.params.get("search")
            if search_query:
                queryset = queryset.filter(
                    Q(centre_name__icontains=search_query) |
                    Q(centre_address__icontains=search_query)
                )
            
            # Location filter (postal code)
            if self.params.get("postal_codes"):
                print("Applying postal code filter:", self.params["postal_codes"])
                queryset = queryset.filter(postal_code__in=self.params["postal_codes"])

            # Vacancy filters
            level = self.params.get("level")  # infant, pg, n1, n2, k1, k2
            if level:
                print("Applying vacancy filter for level:", level)
                vacancy_field = f"{level}_vacancy_current_month"
                queryset = queryset.exclude(**{vacancy_field: "0"})

            # Service model filter
            if self.params.get("service_models"):
                print("Applying service model filter:", self.params["service_models"])
                queryset = queryset.filter(service_model__in=self.params["service_models"])

            # Language filter
            if self.params.get("second_language"):
                print("Applying language filter:", self.params["second_language"])
                queryset = queryset.filter(
                    second_languages_offered__icontains=self.params["second_language"]
                )

            # Additional filters
            if self.params.get("spark_certified"):
                print("Applying SPARK certification filter")
                queryset = queryset.filter(spark_certified="Yes")

            if self.params.get("transport_required"):
                print("Applying transport filter")
                queryset = queryset.filter(provision_of_transport="Yes")

            print("Final queryset count:", queryset.count())

            # Get page parameters
            page = int(self.params.get("page", 1))
            page_size = int(self.params.get("page_size", 10))
            
            # Calculate start and end indices
            start = (page - 1) * page_size
            end = start + page_size
            
            # Get total count before slicing
            total = queryset.count()
            
            # Get results for current page
            results = queryset[start:end]
            
            # Serialize the results
            serializer = self.serializer_class(results, many=True)
            
            return {
                "results": serializer.data,
                "total": total,
                "page": page,
                "page_size": page_size,
                "total_pages": (total + page_size - 1) // page_size,
                "type": "preschool"
            }

        except Exception as e:
            print(f"Error in preschool search: {str(e)}")
            raise