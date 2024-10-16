import requests
import psycopg2
from django.core.management.base import BaseCommand
from dotenv import load_dotenv
import os

class Command(BaseCommand):
    help = 'Fetch data from OpenAPI for HDB resale prices'

    def handle(self, *args, **kwargs):
        datasetId = "d_8b84c4ee58e3cfc0ece0d773c8ca6abc"
        url = "https://data.gov.sg/api/action/datastore_search?resource_id="  + datasetId 

        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
            records = data.get('result', {}).get('records', [])

            # Load environment variables from .env file
            load_dotenv()

            # Connect to NeonDB using environment variables
            conn = psycopg2.connect(
                dbname=os.getenv("DB_NAME"),
                user=os.getenv("DB_USER"),
                password=os.getenv("DB_PASSWORD"),
                host=os.getenv("DB_HOST"),
                port=os.getenv("DB_PORT")
            )
            cursor = conn.cursor()

            for record in records:
                cursor.execute("""
                    SELECT 1 FROM HDB_data WHERE month = %(month)s AND town = %(town)s AND block = %(block)s AND flat_type = %(flat_type)s
                """, {
                    'month': record['month'],
                    'town': record['town'],
                    'block': record['block'],
                    'flat_type': record['flat_type']
                })

                if not cursor.fetchone():
                    cursor.execute("""
                        INSERT INTO HDB_data (
                            month, town, flat_type, block, street_name, storey_range, floor_area_sqm, flat_model, lease_commence_date, remaining_lease, resale_price
                        ) VALUES (
                            %(month)s, %(town)s, %(flat_type)s, %(block)s, %(street_name)s, %(storey_range)s, %(floor_area_sqm)s, %(flat_model)s, %(lease_commence_date)s, %(remaining_lease)s, %(resale_price)s
                        )
                    """, record)

            conn.commit()
            cursor.close()
            conn.close()

            self.stdout.write(self.style.SUCCESS('Successfully written and saved data'))
        else:
            self.stdout.write(self.style.ERROR('Failed to fetch data'))