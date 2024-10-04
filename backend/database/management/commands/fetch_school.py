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
            cursor.execute("SELECT * FROM school_info") 

            # Define the column names based on your table structure
            columns = [
                'school_name', 'url_address', 'address', 'postal_code', 'telephone_no', 'telephone_no_2',
                'fax_no', 'fax_no_2', 'email_address', 'mrt_desc', 'bus_desc', 'principal_name',
                'first_vp_name', 'second_vp_name', 'third_vp_name', 'fourth_vp_name', 'fifth_vp_name',
                'sixth_vp_name', 'dgp_code', 'zone_code', 'type_code', 'nature_code', 'session_code',
                'mainlevel_code', 'sap_ind', 'autonomous_ind', 'gifted_ind', 'ip_ind', 'mothertongue1_code',
                'mothertongue2_code', 'mothertongue3_code'
            ]

            records = cursor.fetchall()
            for record in records:
                record_dict = dict(zip(columns, record))
  

            self.stdout.write(self.style.SUCCESS('Successfully fetched and saved data'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Failed to fetch data: {e}'))
        finally:
            if conn:
                cursor.close()
                conn.close()
                return record_dict