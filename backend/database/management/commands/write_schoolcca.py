import requests
import psycopg2
from django.core.management.base import BaseCommand
from dotenv import load_dotenv
import os

class Command(BaseCommand):
    help = 'Fetch data from OpenAPI for preschool centres'

    def handle(self, *args, **kwargs):
        datasetId = "d_9aba12b5527843afb0b2e8e4ed6ac6bd"
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
                    SELECT 1 FROM school_cca WHERE school_name = %(school_name)s AND cca_customized_name = %(cca_customized_name)s
                """, {'school_name': record['school_name'], 'cca_customized_name': record['cca_customized_name']})

                if not cursor.fetchone():
                    cursor.execute("""
                        INSERT INTO school_cca (
                            school_name, school_section, cca_grouping_desc, cca_generic_name, cca_customized_name
                        ) VALUES (
                            %(school_name)s, %(school_section)s, %(cca_grouping_desc)s, %(cca_generic_name)s, %(cca_customized_name)s
                        )
                    """, record)

            conn.commit()
            cursor.close()
            conn.close()

            self.stdout.write(self.style.SUCCESS('Successfully written and saved data'))
        else:
            self.stdout.write(self.style.ERROR('Failed to fetch data'))