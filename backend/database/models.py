from django.db import models

class preschool_centre(models.Model):
    tp_code = models.CharField(max_length=255)
    centre_code = models.CharField(max_length=255)
    centre_name = models.CharField(max_length=255)
    organisation_code = models.CharField(max_length=255)
    organisation_description = models.CharField(max_length=255)
    service_model = models.CharField(max_length=255)
    centre_contact_no = models.CharField(max_length=255)
    centre_email_address = models.EmailField()
    centre_address = models.TextField()
    postal_code = models.CharField(max_length=10)
    centre_website = models.URLField()
    infant_vacancy_current_month = models.CharField(max_length=255)
    infant_vacancy_next_month = models.CharField(max_length=255)
    infant_vacancy_third_month = models.CharField(max_length=255)
    infant_vacancy_fourth_month = models.CharField(max_length=255)
    infant_vacancy_fifth_month = models.CharField(max_length=255)
    infant_vacancy_sixth_month = models.CharField(max_length=255)
    infant_vacancy_seventh_month = models.CharField(max_length=255)
    pg_vacancy_current_month = models.CharField(max_length=255)
    pg_vacancy_next_month = models.CharField(max_length=255)
    pg_vacancy_third_month = models.CharField(max_length=255)
    pg_vacancy_fourth_month = models.CharField(max_length=255)
    pg_vacancy_fifth_month = models.CharField(max_length=255)
    pg_vacancy_sixth_month = models.CharField(max_length=255)
    pg_vacancy_seventh_month = models.CharField(max_length=255)
    n1_vacancy_current_month = models.CharField(max_length=255)
    n1_vacancy_next_month = models.CharField(max_length=255)
    n1_vacancy_third_month = models.CharField(max_length=255)
    n1_vacancy_fourth_month = models.CharField(max_length=255)
    n1_vacancy_fifth_month = models.CharField(max_length=255)
    n1_vacancy_sixth_month = models.CharField(max_length=255)
    n1_vacancy_seventh_month = models.CharField(max_length=255)
    n2_vacancy_current_month = models.CharField(max_length=255)
    n2_vacancy_next_month = models.CharField(max_length=255)
    n2_vacancy_third_month = models.CharField(max_length=255)
    n2_vacancy_fourth_month = models.CharField(max_length=255)
    n2_vacancy_fifth_month = models.CharField(max_length=255)
    n2_vacancy_sixth_month = models.CharField(max_length=255)
    n2_vacancy_seventh_month = models.CharField(max_length=255)
    k1_vacancy_current_month = models.CharField(max_length=255)
    k1_vacancy_next_month = models.CharField(max_length=255)
    k1_vacancy_third_month = models.CharField(max_length=255)
    k1_vacancy_fourth_month = models.CharField(max_length=255)
    k1_vacancy_fifth_month = models.CharField(max_length=255)
    k1_vacancy_sixth_month = models.CharField(max_length=255)
    k1_vacancy_seventh_month = models.CharField(max_length=255)
    k2_vacancy_current_month = models.CharField(max_length=255)
    k2_vacancy_next_month = models.CharField(max_length=255)
    k2_vacancy_third_month = models.CharField(max_length=255)
    k2_vacancy_fourth_month = models.CharField(max_length=255)
    k2_vacancy_fifth_month = models.CharField(max_length=255)
    k2_vacancy_sixth_month = models.CharField(max_length=255)
    k2_vacancy_seventh_month = models.CharField(max_length=255)
    food_offered = models.CharField(max_length=255)
    second_languages_offered = models.CharField(max_length=255)
    spark_certified = models.CharField(max_length=255)
    weekday_full_day = models.CharField(max_length=255)
    saturday = models.CharField(max_length=255)
    scheme_type = models.CharField(max_length=255)
    extended_operating_hours = models.CharField(max_length=255)
    provision_of_transport = models.CharField(max_length=255)
    government_subsidy = models.CharField(max_length=255)
    gst_regisration = models.CharField(max_length=255)
    last_updated = models.CharField(max_length=255)
    remarks = models.TextField()

    def __str__(self):
        return self.centre_name

class preschool_charges(models.Model):
    centre_code = models.CharField(max_length=255)
    centre_name = models.CharField(max_length=255)
    incidental_charges = models.CharField(max_length=255)
    frequency = models.CharField(max_length=255)
    amount = models.CharField(max_length=255)

    def __str__(self):
        return self.centre_name

