from typing import Dict, Optional, Tuple
import requests
from django.conf import settings
from django.core.cache import cache

class GeocodingService:
    def __init__(self):
        self.api_key = settings.GOOGLE_MAPS_API_KEY
        self.base_url = "https://maps.googleapis.com/maps/api/geocode/json"

    def get_coordinates(self, address: str) -> Optional[Tuple[float, float]]:
        # Check cache first
        cache_key = f"geocode_{address}"
        cached_result = cache.get(cache_key)
        if cached_result:
            return cached_result

        try:
            # Add Singapore to make the geocoding more accurate
            full_address = f"{address}, Singapore"
            response = requests.get(
                self.base_url,
                params={
                    "address": full_address,
                    "key": self.api_key
                }
            )
            data = response.json()
            
            if data["status"] == "OK" and data["results"]:
                location = data["results"][0]["geometry"]["location"]
                coordinates = (location["lat"], location["lng"])
                # Cache the result for future use
                cache.set(cache_key, coordinates, timeout=86400)  # Cache for 24 hours
                return coordinates
            return None
        except Exception as e:
            print(f"Geocoding error for {address}: {str(e)}")
            return None
