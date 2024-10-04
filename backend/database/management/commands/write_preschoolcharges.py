import requests
import psycopg2
from django.core.management.base import BaseCommand
from dotenv import load_dotenv
import os

class Command(BaseCommand):
    help = 'Fetch data from OpenAPI for preschool centres'

    def handle(self, *args, **kwargs):
        datasetId = "d_253a7e348279bf0a87666a71f7ea2e67"
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
                    SELECT 1 FROM preschool_charges WHERE centre_code = %(centre_code)s
                """, {'centre_code': record['centre_code']})

                if not cursor.fetchone():
                    cursor.execute("""
                        INSERT INTO preschool_charges (
                            centre_code, centre_name, incidental_charges, frequency, amount
                        ) VALUES (
                            %(centre_code)s, %(centre_name)s, %(incidental_charges)s, %(frequency)s, %(amount)s
                        )
                    """, record)

            conn.commit()
            cursor.close()
            conn.close()

            self.stdout.write(self.style.SUCCESS('Successfully written and saved data'))
        else:
            self.stdout.write(self.style.ERROR('Failed to fetch data'))