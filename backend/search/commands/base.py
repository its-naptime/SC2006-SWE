# search/commands/base.py
from abc import ABC, abstractmethod
from typing import Any, Dict


class SearchCommand(ABC):
    @abstractmethod
    def execute(self) -> Dict[str, Any]:
        """Base search command that all specific searches will implement"""
