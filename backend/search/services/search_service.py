from typing import Any, Dict

from ..commands.hdb_search import HDBSearchCommand
from ..commands.preschool_search import PreschoolSearchCommand
from ..commands.school_search import SchoolSearchCommand


class SearchService:
    def __init__(self):
        self.commands = {
            "hdb": HDBSearchCommand,
            "school": SchoolSearchCommand,
            "preschool": PreschoolSearchCommand,
        }

    def execute_search(
        self,
        query_type: str,
        search_params: Dict[str, Any],
        page: int = 1,
        page_size: int = 10,
    ) -> Dict[str, Any]:
        command_class = self.commands.get(query_type)
        if not command_class:
            raise ValueError(f"Invalid query type: {query_type}")

        command = command_class(search_params, page=page, page_size=page_size)
        return command.execute()
