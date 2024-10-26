from abc import ABC, abstractmethod
from typing import Any, Dict

from django.core.paginator import Paginator


class SearchCommand(ABC):
    def __init__(self, params: Dict[str, Any], page: int = 1, page_size: int = 10):
        self.params = params
        self.page = page
        self.page_size = page_size
        self.serializer_class = None

    def paginate_queryset(self, queryset) -> Dict[str, Any]:
        # First serialize the queryset
        serializer = self.serializer_class(queryset, many=True)
        serialized_data = serializer.data

        # Then paginate the serialized data
        paginator = Paginator(serialized_data, self.page_size)
        total_pages = paginator.num_pages

        try:
            current_page = paginator.page(self.page)
        except:
            current_page = paginator.page(1)

        return {
            "count": paginator.count,
            "total_pages": total_pages,
            "current_page": current_page.number,
            "next_page": (
                current_page.next_page_number() if current_page.has_next() else None
            ),
            "previous_page": (
                current_page.previous_page_number()
                if current_page.has_previous()
                else None
            ),
            "results": list(current_page.object_list),
        }

    @abstractmethod
    def execute(self) -> Dict[str, Any]:
        pass
