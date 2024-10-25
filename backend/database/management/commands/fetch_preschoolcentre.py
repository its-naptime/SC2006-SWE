import psycopg2
from django.core.management.base import BaseCommand
from database.models import preschool_centre
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
            cursor.execute("SELECT * FROM preschool_centre") 
            records = cursor.fetchall()

            # Define the column names based on your table structure
            columns = [desc[0] for desc in cursor.description]

            for record in records:
                record_dict = dict(zip(columns, record))
                preschool_centre.objects.update_or_create(
                    id=record_dict.get('id'),  # Use a unique field to identify records
                    defaults={
                        'tp_code': record_dict.get('tp_code'),
                        'centre_code': record_dict.get('centre_code'),
                        'centre_name': record_dict.get('centre_name'),
                        'organisation_code': record_dict.get('organisation_code'),
                        'organisation_description': record_dict.get('organisation_description'),
                        'service_model': record_dict.get('service_model'),
                        'centre_contact_no': record_dict.get('centre_contact_no'),
                        'centre_email_address': record_dict.get('centre_email_address'),
                        'centre_address': record_dict.get('centre_address'),
                        'postal_code': record_dict.get('postal_code'),
                        'centre_website': record_dict.get('centre_website'),
                        'infant_vacancy_current_month': record_dict.get('infant_vacancy_current_month'),
                        'infant_vacancy_next_month': record_dict.get('infant_vacancy_next_month'),
                        'infant_vacancy_third_month': record_dict.get('infant_vacancy_third_month'),
                        'infant_vacancy_fourth_month': record_dict.get('infant_vacancy_fourth_month'),
                        'infant_vacancy_fifth_month': record_dict.get('infant_vacancy_fifth_month'),
                        'infant_vacancy_sixth_month': record_dict.get('infant_vacancy_sixth_month'),
                        'infant_vacancy_seventh_month': record_dict.get('infant_vacancy_seventh_month'),
                        'pg_vacancy_current_month': record_dict.get('pg_vacancy_current_month'),
                        'pg_vacancy_next_month': record_dict.get('pg_vacancy_next_month'),
                        'pg_vacancy_third_month': record_dict.get('pg_vacancy_third_month'),
                        'pg_vacancy_fourth_month': record_dict.get('pg_vacancy_fourth_month'),
                        'pg_vacancy_fifth_month': record_dict.get('pg_vacancy_fifth_month'),
                        'pg_vacancy_sixth_month': record_dict.get('pg_vacancy_sixth_month'),
                        'pg_vacancy_seventh_month': record_dict.get('pg_vacancy_seventh_month'),
                        'n1_vacancy_current_month': record_dict.get('n1_vacancy_current_month'),
                        'n1_vacancy_next_month': record_dict.get('n1_vacancy_next_month'),
                        'n1_vacancy_third_month': record_dict.get('n1_vacancy_third_month'),
                        'n1_vacancy_fourth_month': record_dict.get('n1_vacancy_fourth_month'),
                        'n1_vacancy_fifth_month': record_dict.get('n1_vacancy_fifth_month'),
                        'n1_vacancy_sixth_month': record_dict.get('n1_vacancy_sixth_month'),
                        'n1_vacancy_seventh_month': record_dict.get('n1_vacancy_seventh_month'),
                        'n2_vacancy_current_month': record_dict.get('n2_vacancy_current_month'),
                        'n2_vacancy_next_month': record_dict.get('n2_vacancy_next_month'),
                        'n2_vacancy_third_month': record_dict.get('n2_vacancy_third_month'),
                        'n2_vacancy_fourth_month': record_dict.get('n2_vacancy_fourth_month'),
                        'n2_vacancy_fifth_month': record_dict.get('n2_vacancy_fifth_month'),
                        'n2_vacancy_sixth_month': record_dict.get('n2_vacancy_sixth_month'),
                        'n2_vacancy_seventh_month': record_dict.get('n2_vacancy_seventh_month'),
                        'k1_vacancy_current_month': record_dict.get('k1_vacancy_current_month'),
                        'k1_vacancy_next_month': record_dict.get('k1_vacancy_next_month'),
                        'k1_vacancy_third_month': record_dict.get('k1_vacancy_third_month'),
                        'k1_vacancy_fourth_month': record_dict.get('k1_vacancy_fourth_month'),
                        'k1_vacancy_fifth_month': record_dict.get('k1_vacancy_fifth_month'),
                        'k1_vacancy_sixth_month': record_dict.get('k1_vacancy_sixth_month'),
                        'k1_vacancy_seventh_month': record_dict.get('k1_vacancy_seventh_month'),
                        'k2_vacancy_current_month': record_dict.get('k2_vacancy_current_month'),
                        'k2_vacancy_next_month': record_dict.get('k2_vacancy_next_month'),
                        'k2_vacancy_third_month': record_dict.get('k2_vacancy_third_month'),
                        'k2_vacancy_fourth_month': record_dict.get('k2_vacancy_fourth_month'),
                        'k2_vacancy_fifth_month': record_dict.get('k2_vacancy_fifth_month'),
                        'k2_vacancy_sixth_month': record_dict.get('k2_vacancy_sixth_month'),
                        'k2_vacancy_seventh_month': record_dict.get('k2_vacancy_seventh_month'),
                        'food_offered': record_dict.get('food_offered'),
                        'second_languages_offered': record_dict.get('second_languages_offered'),
                        'spark_certified': record_dict.get('spark_certified'),
                        'weekday_full_day': record_dict.get('weekday_full_day'),
                        'saturday': record_dict.get('saturday'),
                        'scheme_type': record_dict.get('scheme_type'),
                        'extended_operating_hours': record_dict.get('extended_operating_hours'),
                        'provision_of_transport': record_dict.get('provision_of_transport'),
                        'government_subsidy': record_dict.get('government_subsidy'),
                        'gst_regisration': record_dict.get('gst_regisration'),
                        'last_updated': record_dict.get('last_updated'),
                        'remarks': record_dict.get('remarks')
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