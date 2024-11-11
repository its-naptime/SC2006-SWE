# management/commands/geocode_locations.py
from django.core.management.base import BaseCommand
from django.conf import settings
import requests
import time
from database.models import school_info, preschool_centre, HDB_data

class Command(BaseCommand):
    help = 'Geocode addresses for schools, preschools, and HDB properties'

    def handle(self, *args, **options):
        def geocode_address(address):
            time.sleep(0.1)  # Rate limiting
            try:
                response = requests.get(
                    'https://maps.googleapis.com/maps/api/geocode/json',
                    params={
                        'address': f"{address}, Singapore",
                        'key': settings.GOOGLE_MAPS_API_KEY,
                    }
                )
                data = response.json()
                if data['status'] == 'OK':
                    location = data['results'][0]['geometry']['location']
                    return location['lat'], location['lng']
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Error geocoding {address}: {str(e)}'))
            return None, None

        # Geocode schools
        for school in school_info.objects.filter(latitude__isnull=True):
            self.stdout.write(f'Geocoding school: {school.school_name}')
            lat, lng = geocode_address(school.address)
            if lat and lng:
                school.latitude = lat
                school.longitude = lng
                school.save()

        # Geocode preschools
        for preschool in preschool_centre.objects.filter(latitude__isnull=True):
            self.stdout.write(f'Geocoding preschool: {preschool.centre_name}')
            lat, lng = geocode_address(preschool.centre_address)
            if lat and lng:
                preschool.latitude = lat
                preschool.longitude = lng
                preschool.save()

        # Geocode HDB
        for hdb in HDB_data.objects.filter(latitude__isnull=True):
            self.stdout.write(f'Geocoding HDB: {hdb.street_name}')
            lat, lng = geocode_address(f"{hdb.block} {hdb.street_name}")
            if lat and lng:
                hdb.latitude = lat
                hdb.longitude = lng
                hdb.save()