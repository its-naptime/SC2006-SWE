# commands/school_search.py
from typing import Any, Dict
from database.models import school_cca, school_info
from database.serializers import SchoolInfoSerializer
from django.db.models import Q
from .base import SearchCommand

class SchoolSearchCommand(SearchCommand):
    def __init__(self, params: Dict[str, Any], page: int = 1, page_size: int = 10):
        super().__init__(params, page, page_size)  # Make sure to pass page and page_size to super
        self.params = params
        self.queryset = school_info.objects.all()
        self.serializer_class = SchoolInfoSerializer
        print("School search initialized with params:", params)  # Debug print

    def execute(self) -> Dict[str, Any]:
        try:
            print("Starting school search execution")  # Debug print
            queryset = self.queryset

            search_query = self.params.get("search")
            if search_query:
                queryset = queryset.filter(
                    Q(school_name__icontains=search_query) |
                    Q(address__icontains=search_query)
                )
                
            # Zone filter
            if self.params.get("zones"):
                print("Applying zone filter:", self.params["zones"])  # Debug print
                queryset = queryset.filter(zone_code__in=self.params["zones"])

            # School type filter
            if self.params.get("types"):
                print("Applying type filter:", self.params["types"])  # Debug print
                queryset = queryset.filter(type_code__in=self.params["types"])

            # Level filter
            if self.params.get("mainlevel"):
                print("Applying level filter:", self.params["mainlevel"])  # Debug print
                queryset = queryset.filter(mainlevel_code=self.params["mainlevel"])

            # Special program filters
            special_programs = []
            if self.params.get("sap"):
                special_programs.append(Q(sap_ind="Yes"))
            if self.params.get("gifted"):
                special_programs.append(Q(gifted_ind="Yes"))
            if self.params.get("ip"):
                special_programs.append(Q(ip_ind="Yes"))
            if special_programs:
                print("Applying special programs filter")  # Debug print
                queryset = queryset.filter(Q(*special_programs, _connector=Q.OR))

            # CCA filter
            if self.params.get("cca"):
                print("Applying CCA filter:", self.params["cca"])  # Debug print
                schools_with_cca = school_cca.objects.filter(
                    cca_generic_name__icontains=self.params["cca"]
                ).values_list("school_name", flat=True)
                queryset = queryset.filter(school_name__in=schools_with_cca)

            # Mother tongue filter
            if self.params.get("mother_tongue"):
                print("Applying mother tongue filter:", self.params["mother_tongue"])  # Debug print
                queryset = queryset.filter(
                    Q(mothertongue1_code=self.params["mother_tongue"]) |
                    Q(mothertongue2_code=self.params["mother_tongue"]) |
                    Q(mothertongue3_code=self.params["mother_tongue"])
                )

            print("Final queryset count:", queryset.count())  # Debug print
            
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
                "type": "school"
            }
            
        except Exception as e:
            print(f"Error in school search: {str(e)}")  # Debug print
            raise