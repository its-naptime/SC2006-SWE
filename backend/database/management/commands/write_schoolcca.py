import requests
import psycopg2
from django.core.management.base import BaseCommand
from dotenv import load_dotenv
import os

class Command(BaseCommand):
    help = 'Fetch data from OpenAPI for school CCA'

    def handle(self, *args, **kwargs):
        datasetId = "d_9aba12b5527843afb0b2e8e4ed6ac6bd"
        base_url = "https://data.gov.sg/api/action/datastore_search"
        limit = 100  # Number of records to fetch per request
        offset = 0  # Starting point for fetching records

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

        while True:
            url = f"{base_url}?resource_id={datasetId}&limit={limit}&offset={offset}"
            response = requests.get(url)

            if response.status_code == 200:
                data = response.json()
                records = data.get('result', {}).get('records', [])

                if not records:
                    break  # Exit the loop if no more records are returned

                for record in records:
                    cursor.execute("""
                        INSERT INTO school_cca (
                            school_name, school_section, cca_grouping_desc, cca_generic_name, cca_customized_name
                        ) VALUES (
                            %(school_name)s, %(school_section)s, %(cca_grouping_desc)s, %(cca_generic_name)s, %(cca_customized_name)s
                        )
                    """, record)

                offset += limit  # Increment the offset to fetch the next set of records

            else:
                self.stdout.write(self.style.ERROR('Failed to fetch data'))
                break

        conn.commit()
        cursor.close()
        conn.close()

        self.stdout.write(self.style.SUCCESS('Successfully written and saved data'))