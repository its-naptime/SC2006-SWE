import requests
import psycopg2
from django.core.management.base import BaseCommand
from dotenv import load_dotenv
import os

class Command(BaseCommand):
    help = 'Fetch data from OpenAPI for preschool centres'

    def handle(self, *args, **kwargs):
        datasetId = "d_696c994c50745b079b3684f0e90ffc53"
        url = "https://data.gov.sg/api/action/datastore_search?resource_id=" + datasetId 

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
                                INSERT INTO preschool_centre (
                                    tp_code, centre_code, centre_name, organisation_code, organisation_description,
                                    service_model, centre_contact_no, centre_email_address, centre_address, postal_code,
                                    centre_website, infant_vacancy_current_month, infant_vacancy_next_month, infant_vacancy_third_month,
                                    infant_vacancy_fourth_month, infant_vacancy_fifth_month, infant_vacancy_sixth_month, infant_vacancy_seventh_month,
                                    pg_vacancy_current_month, pg_vacancy_next_month, pg_vacancy_third_month, pg_vacancy_fourth_month,
                                    pg_vacancy_fifth_month, pg_vacancy_sixth_month, pg_vacancy_seventh_month, n1_vacancy_current_month,
                                    n1_vacancy_next_month, n1_vacancy_third_month, n1_vacancy_fourth_month, n1_vacancy_fifth_month,
                                    n1_vacancy_sixth_month, n1_vacancy_seventh_month, n2_vacancy_current_month, n2_vacancy_next_month,
                                    n2_vacancy_third_month, n2_vacancy_fourth_month, n2_vacancy_fifth_month, n2_vacancy_sixth_month,
                                    n2_vacancy_seventh_month, k1_vacancy_current_month, k1_vacancy_next_month, k1_vacancy_third_month,
                                    k1_vacancy_fourth_month, k1_vacancy_fifth_month, k1_vacancy_sixth_month, k1_vacancy_seventh_month,
                                    k2_vacancy_current_month, k2_vacancy_next_month, k2_vacancy_third_month, k2_vacancy_fourth_month,
                                    k2_vacancy_fifth_month, k2_vacancy_sixth_month, k2_vacancy_seventh_month, food_offered,
                                    second_languages_offered, spark_certified, weekday_full_day, saturday, scheme_type,
                                    extended_operating_hours, provision_of_transport, government_subsidy, gst_regisration,
                                    last_updated, remarks
                                ) VALUES (
                                    %(tp_code)s, %(centre_code)s, %(centre_name)s, %(organisation_code)s, %(organisation_description)s,
                                    %(service_model)s, %(centre_contact_no)s, %(centre_email_address)s, %(centre_address)s, %(postal_code)s,
                                    %(centre_website)s, %(infant_vacancy_current_month)s, %(infant_vacancy_next_month)s, %(infant_vacancy_third_month)s,
                                    %(infant_vacancy_fourth_month)s, %(infant_vacancy_fifth_month)s, %(infant_vacancy_sixth_month)s, %(infant_vacancy_seventh_month)s,
                                    %(pg_vacancy_current_month)s, %(pg_vacancy_next_month)s, %(pg_vacancy_third_month)s, %(pg_vacancy_fourth_month)s,
                                    %(pg_vacancy_fifth_month)s, %(pg_vacancy_sixth_month)s, %(pg_vacancy_seventh_month)s, %(n1_vacancy_current_month)s,
                                    %(n1_vacancy_next_month)s, %(n1_vacancy_third_month)s, %(n1_vacancy_fourth_month)s, %(n1_vacancy_fifth_month)s,
                                    %(n1_vacancy_sixth_month)s, %(n1_vacancy_seventh_month)s, %(n2_vacancy_current_month)s, %(n2_vacancy_next_month)s,
                                    %(n2_vacancy_third_month)s, %(n2_vacancy_fourth_month)s, %(n2_vacancy_fifth_month)s, %(n2_vacancy_sixth_month)s,
                                    %(n2_vacancy_seventh_month)s, %(k1_vacancy_current_month)s, %(k1_vacancy_next_month)s, %(k1_vacancy_third_month)s,
                                    %(k1_vacancy_fourth_month)s, %(k1_vacancy_fifth_month)s, %(k1_vacancy_sixth_month)s, %(k1_vacancy_seventh_month)s,
                                    %(k2_vacancy_current_month)s, %(k2_vacancy_next_month)s, %(k2_vacancy_third_month)s, %(k2_vacancy_fourth_month)s,
                                    %(k2_vacancy_fifth_month)s, %(k2_vacancy_sixth_month)s, %(k2_vacancy_seventh_month)s, %(food_offered)s,
                                    %(second_languages_offered)s, %(spark_certified)s, %(weekday_full_day)s, %(saturday)s, %(scheme_type)s,
                                    %(extended_operating_hours)s, %(provision_of_transport)s, %(government_subsidy)s, %(gst_regisration)s,
                                    %(last_updated)s, %(remarks)s
                                )
                            """, record)

            conn.commit()
            cursor.close()
            conn.close()

            self.stdout.write(self.style.SUCCESS('Successfully fetched and saved data'))
        else:
            self.stdout.write(self.style.ERROR('Failed to fetch data'))