import psycopg2
from django.core.management.base import BaseCommand
from database.models import preschool_charges
from dotenv import load_dotenv
import os

class Command(BaseCommand):
    help = 'Fetch data from NeonDB for preschool centres'

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
            cursor.execute("SELECT * FROM preschool_charges")
            records = cursor.fetchall()

            # Define the column names based on your table structure
            columns = [desc[0] for desc in cursor.description]

            for record in records:
                        record_dict = dict(zip(columns, record))
                        preschool_charges.objects.update_or_create(
                            id=record_dict.get('id'),  # Use a unique field to identify records
                            defaults={
                                'centre_code': record_dict.get('centre_code'),
                                'centre_name': record_dict.get('centre_name'),
                                'incidental_charges': record_dict.get('incidental_charges'),
                                'frequency': record_dict.get('frequency'),
                                'amount': record_dict.get('amount'),
                            }
                        )

            self.stdout.write(self.style.SUCCESS('Successfully fetched and saved data'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Failed to fetch data: {e}'))
        finally:
            if conn:
                cursor.close()
                conn.close()
                return record_dict