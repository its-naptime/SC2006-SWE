from typing import Any, Dict

from database.models import school_cca, school_info
from database.serializers import SchoolInfoSerializer
from django.db.models import Q

from .base import SearchCommand


class SchoolSearchCommand(SearchCommand):
    def __init__(self, params: Dict[str, Any]):
        self.params = params
        self.queryset = school_info.objects.all()
        self.serializer_class = SchoolInfoSerializer

    def execute(self) -> Dict[str, Any]:
        queryset = self.queryset

        # Zone filter
        if self.params.get("zones"):
            queryset = queryset.filter(zone_code__in=self.params["zones"])

        # School type filter
        if self.params.get("types"):
            queryset = queryset.filter(type_code__in=self.params["types"])

        # Level filter
        if self.params.get("mainlevel"):
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
            queryset = queryset.filter(Q(*special_programs, _connector=Q.OR))

        # CCA filter
        if self.params.get("cca"):
            schools_with_cca = school_cca.objects.filter(
                cca_generic_name__icontains=self.params["cca"]
            ).values_list("school_name", flat=True)
            queryset = queryset.filter(school_name__in=schools_with_cca)

        # Mother tongue filter
        if self.params.get("mother_tongue"):
            queryset = queryset.filter(
                Q(mothertongue1_code=self.params["mother_tongue"])
                | Q(mothertongue2_code=self.params["mother_tongue"])
                | Q(mothertongue3_code=self.params["mother_tongue"])
            )

        serializer = self.serializer_class(queryset, many=True)
        # Paginate the serialized data
        paginated_data = self.paginate_queryset(serializer.data)

        return {**paginated_data, "type": "school"}
