from django.db import models
from django.contrib.auth.models import User

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
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

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

class school_info(models.Model):
    school_name = models.CharField(max_length=255)
    url_address = models.URLField()
    address = models.TextField()
    postal_code = models.CharField(max_length=10)
    telephone_no = models.CharField(max_length=20)
    telephone_no_2 = models.CharField(max_length=20, blank=True, null=True)
    fax_no = models.CharField(max_length=20, blank=True, null=True)
    fax_no_2 = models.CharField(max_length=20, blank=True, null=True)
    email_address = models.EmailField()
    mrt_desc = models.TextField(blank=True, null=True)
    bus_desc = models.TextField(blank=True, null=True)
    principal_name = models.CharField(max_length=255)
    first_vp_name = models.CharField(max_length=255, blank=True, null=True)
    second_vp_name = models.CharField(max_length=255, blank=True, null=True)
    third_vp_name = models.CharField(max_length=255, blank=True, null=True)
    fourth_vp_name = models.CharField(max_length=255, blank=True, null=True)
    fifth_vp_name = models.CharField(max_length=255, blank=True, null=True)
    sixth_vp_name = models.CharField(max_length=255, blank=True, null=True)
    dgp_code = models.CharField(max_length=255)
    zone_code = models.CharField(max_length=255)
    type_code = models.CharField(max_length=255)
    nature_code = models.CharField(max_length=255)
    session_code = models.CharField(max_length=255)
    mainlevel_code = models.CharField(max_length=255)
    sap_ind = models.CharField(max_length=255)
    autonomous_ind = models.CharField(max_length=255)
    gifted_ind = models.CharField(max_length=255)
    ip_ind = models.CharField(max_length=255)
    mothertongue1_code = models.CharField(max_length=255)
    mothertongue2_code = models.CharField(max_length=255, blank=True, null=True)
    mothertongue3_code = models.CharField(max_length=255, blank=True, null=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    def __str__(self):
        return self.school_name

class school_cca(models.Model):
    school_name = models.CharField(max_length=255)
    school_section = models.CharField(max_length=255)
    cca_grouping_desc = models.CharField(max_length=255)
    cca_generic_name = models.CharField(max_length=255)
    cca_customized_name = models.CharField(max_length=255)

    def __str__(self):
        return self.cca_customized_name

class HDB_data(models.Model):
    month = models.CharField(max_length=7)
    town = models.CharField(max_length=255)
    flat_type = models.CharField(max_length=255)
    block = models.CharField(max_length=255)
    street_name = models.CharField(max_length=255)
    storey_range = models.CharField(max_length=255)
    floor_area_sqm = models.DecimalField(max_digits=10, decimal_places=2)
    flat_model = models.CharField(max_length=255)
    lease_commence_date = models.IntegerField()
    remaining_lease = models.CharField(max_length=255)
    resale_price = models.DecimalField(max_digits=15, decimal_places=2)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"{self.town} - {self.flat_type} - {self.resale_price}"

class UserHDBSearch(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    search_query = models.CharField(max_length=255)
    month = models.CharField(max_length=7)
    town = models.CharField(max_length=255)
    flat_type = models.CharField(max_length=255)
    block = models.CharField(max_length=255)
    street_name = models.CharField(max_length=255)
    storey_range = models.CharField(max_length=255)
    floor_area_sqm = models.DecimalField(max_digits=10, decimal_places=2)
    flat_model = models.CharField(max_length=255)
    lease_commence_date = models.IntegerField()
    remaining_lease = models.CharField(max_length=255)
    resale_price = models.DecimalField(max_digits=15, decimal_places=2)
    search_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.search_query} - {self.town} - {self.flat_type} - {self.resale_price}"
    
class UserPreschoolSearch(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    search_query = models.CharField(max_length=255)
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
    gst_registration = models.CharField(max_length=255)
    last_updated = models.CharField(max_length=255)
    remarks = models.TextField()
    search_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.search_query} - {self.centre_name} - {self.service_model}"

class UserSchoolSearch(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    search_query = models.CharField(max_length=255)
    school_name = models.CharField(max_length=255)
    url_address = models.URLField()
    address = models.TextField()
    postal_code = models.CharField(max_length=10)
    telephone_no = models.CharField(max_length=20)
    telephone_no_2 = models.CharField(max_length=20, blank=True, null=True)
    fax_no = models.CharField(max_length=20, blank=True, null=True)
    fax_no_2 = models.CharField(max_length=20, blank=True, null=True)
    email_address = models.EmailField()
    mrt_desc = models.TextField(blank=True, null=True)
    bus_desc = models.TextField(blank=True, null=True)
    principal_name = models.CharField(max_length=255)
    first_vp_name = models.CharField(max_length=255, blank=True, null=True)
    second_vp_name = models.CharField(max_length=255, blank=True, null=True)
    third_vp_name = models.CharField(max_length=255, blank=True, null=True)
    fourth_vp_name = models.CharField(max_length=255, blank=True, null=True)
    fifth_vp_name = models.CharField(max_length=255, blank=True, null=True)
    sixth_vp_name = models.CharField(max_length=255, blank=True, null=True)
    dgp_code = models.CharField(max_length=255)
    zone_code = models.CharField(max_length=255)
    type_code = models.CharField(max_length=255)
    nature_code = models.CharField(max_length=255)
    session_code = models.CharField(max_length=255)
    mainlevel_code = models.CharField(max_length=255)
    sap_ind = models.CharField(max_length=255)
    autonomous_ind = models.CharField(max_length=255)
    gifted_ind = models.CharField(max_length=255)
    ip_ind = models.CharField(max_length=255)
    mothertongue1_code = models.CharField(max_length=255)
    mothertongue2_code = models.CharField(max_length=255, blank=True, null=True)
    mothertongue3_code = models.CharField(max_length=255, blank=True, null=True)
    search_date = models.DateTimeField(auto_now_add=True)
    latitude = models.DecimalField(max_digits=10, decimal_places=7, blank=True, null=True)
    longitude = models.DecimalField(max_digits=10, decimal_places=7, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.search_query} - {self.school_name}"
    

class Place(models.Model):
    place_id = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    status = models.CharField(max_length=50)

    def __str__(self):
        return self.name
    
class Review(models.Model):
    place = models.ForeignKey(Place, related_name='reviews', on_delete=models.CASCADE)
    author_name = models.CharField(max_length=255)
    author_url = models.URLField()
    language = models.CharField(max_length=10)
    original_language = models.CharField(max_length=10)
    profile_photo_url = models.URLField()
    rating = models.IntegerField()
    relative_time_description = models.CharField(max_length=255)
    text = models.TextField()
    time = models.BigIntegerField()
    translated = models.BooleanField()

    def __str__(self):
        return f"{self.author_name} - {self.place.name}"