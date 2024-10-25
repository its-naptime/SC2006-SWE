import psycopg2
from django.core.management.base import BaseCommand
from database.models import school_cca
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
            cursor.execute("SELECT * FROM school_cca")

            columns = [
                'school_name', 'school_section', 'cca_grouping_desc', 'cca_generic_name', 'cca_customized_name'
            ]

            records = cursor.fetchall()

            for record in records:
                record_dict = dict(zip(columns, record))
                school_cca.objects.update_or_create(
                    id=record_dict.get('id'),  # Use a unique field to identify records
                    defaults={
                        'school_name': record_dict.get('school_name'),
                        'school_section': record_dict.get('school_section'),
                        'cca_grouping_desc': record_dict.get('cca_grouping_desc'),
                        'cca_generic_name': record_dict.get('cca_generic_name'),
                        'cca_customized_name': record_dict.get('cca_customized_name')
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