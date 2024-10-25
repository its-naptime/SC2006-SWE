import psycopg2
from django.core.management.base import BaseCommand
from database.models import HDB_data as hdb_data
from dotenv import load_dotenv
import os

class Command(BaseCommand):
    help = 'Fetch data from NeonDB for HDB resale flats'

    def handle(self, *args, **kwargs):
        # Database connection parameters
        load_dotenv()

        try:
            # Connect to the database
            conn = psycopg2.connect(
                dbname=os.getenv("DB_NAME"),
                user=os.getenv("DB_USER"),
                password=os.getenv("DB_PASSWORD"),
                host=os.getenv("DB_HOST"),
                port=os.getenv("DB_PORT")
            )
            cursor = conn.cursor()

            # Execute the query to fetch data
            cursor.execute("SELECT * FROM hdb_data")
            records = cursor.fetchall()

            # Define the column names based on your table structure
            columns = [desc[0] for desc in cursor.description]

            for record in records:
                record_dict = dict(zip(columns, record))
                hdb_data.objects.update_or_create(
                    month=record_dict['month'],
                    town=record_dict['town'],
                    flat_type=record_dict['flat_type'],
                    block=record_dict['block'],
                    street_name=record_dict['street_name'],
                    defaults={
                        'storey_range': record_dict['storey_range'],
                        'floor_area_sqm': record_dict['floor_area_sqm'],
                        'flat_model': record_dict['flat_model'],
                        'lease_commence_date': record_dict['lease_commence_date'],
                        'remaining_lease': record_dict['remaining_lease'],
                        'resale_price': record_dict['resale_price']
                    }
                )

            self.stdout.write(self.style.SUCCESS('Successfully fetched and saved data'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Failed to fetch data: {e}'))
        finally:
            if conn:
                cursor.close()
                conn.close()