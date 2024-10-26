import requests
import psycopg2
from django.core.management.base import BaseCommand
from dotenv import load_dotenv
import os

class Command(BaseCommand):
    help = 'Fetch data from OpenAPI for preschool centres'

    def handle(self, *args, **kwargs):
        datasetId = "d_688b934f82c1059ed0a6993d2a829089"
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
                    SELECT 1 FROM school_info WHERE school_name = %(school_name)s
                """, {'school_name': record['school_name']})

                if not cursor.fetchone():
                    cursor.execute("""
                        INSERT INTO school_info (
                            school_name, url_address, address, postal_code, telephone_no, telephone_no_2, 
                            fax_no, fax_no_2, email_address, mrt_desc, bus_desc, principal_name, 
                            first_vp_name, second_vp_name, third_vp_name, fourth_vp_name, fifth_vp_name, 
                            sixth_vp_name, dgp_code, zone_code, type_code, nature_code, session_code, 
                            mainlevel_code, sap_ind, autonomous_ind, gifted_ind, ip_ind, 
                            mothertongue1_code, mothertongue2_code, mothertongue3_code
                        ) VALUES (
                            %(school_name)s, %(url_address)s, %(address)s, %(postal_code)s, %(telephone_no)s, %(telephone_no_2)s, 
                            %(fax_no)s, %(fax_no_2)s, %(email_address)s, %(mrt_desc)s, %(bus_desc)s, %(principal_name)s, 
                            %(first_vp_name)s, %(second_vp_name)s, %(third_vp_name)s, %(fourth_vp_name)s, %(fifth_vp_name)s, 
                            %(sixth_vp_name)s, %(dgp_code)s, %(zone_code)s, %(type_code)s, %(nature_code)s, %(session_code)s, 
                            %(mainlevel_code)s, %(sap_ind)s, %(autonomous_ind)s, %(gifted_ind)s, %(ip_ind)s, 
                            %(mothertongue1_code)s, %(mothertongue2_code)s, %(mothertongue3_code)s
                        )
                    """, record)

            conn.commit()
            cursor.close()
            conn.close()

            self.stdout.write(self.style.SUCCESS('Successfully written and saved data'))
        else:
            self.stdout.write(self.style.ERROR('Failed to fetch data'))