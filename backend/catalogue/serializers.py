from rest_framework import serializers
from database.models import UserSchoolSearch, UserPreschoolSearch, UserHDBSearch

class UserSchoolSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSchoolSearch
        fields = [
            'search_query', 'school_name', 'url_address', 'address', 'postal_code',
            'telephone_no', 'telephone_no_2', 'fax_no', 'fax_no_2', 'email_address',
            'mrt_desc', 'bus_desc', 'principal_name', 'first_vp_name', 'second_vp_name',
            'third_vp_name', 'fourth_vp_name', 'fifth_vp_name', 'sixth_vp_name',
            'dgp_code', 'zone_code', 'type_code', 'nature_code', 'session_code',
            'mainlevel_code', 'sap_ind', 'autonomous_ind', 'gifted_ind', 'ip_ind',
            'mothertongue1_code', 'mothertongue2_code', 'mothertongue3_code'
        ]


class UserPreschoolSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPreschoolSearch
        fields = [
            'search_query', 'tp_code', 'centre_code', 'centre_name', 'organisation_code',
            'organisation_description', 'service_model', 'centre_contact_no', 'centre_email_address',
            'centre_address', 'postal_code', 'centre_website', 'infant_vacancy_current_month',
            'infant_vacancy_next_month', 'infant_vacancy_third_month', 'infant_vacancy_fourth_month',
            'infant_vacancy_fifth_month', 'infant_vacancy_sixth_month', 'infant_vacancy_seventh_month',
            'pg_vacancy_current_month', 'pg_vacancy_next_month', 'pg_vacancy_third_month',
            'pg_vacancy_fourth_month', 'pg_vacancy_fifth_month', 'pg_vacancy_sixth_month',
            'pg_vacancy_seventh_month', 'n1_vacancy_current_month', 'n1_vacancy_next_month',
            'n1_vacancy_third_month', 'n1_vacancy_fourth_month', 'n1_vacancy_fifth_month',
            'n1_vacancy_sixth_month', 'n1_vacancy_seventh_month', 'n2_vacancy_current_month',
            'n2_vacancy_next_month', 'n2_vacancy_third_month', 'n2_vacancy_fourth_month',
            'n2_vacancy_fifth_month', 'n2_vacancy_sixth_month', 'n2_vacancy_seventh_month',
            'k1_vacancy_current_month', 'k1_vacancy_next_month', 'k1_vacancy_third_month',
            'k1_vacancy_fourth_month', 'k1_vacancy_fifth_month', 'k1_vacancy_sixth_month',
            'k1_vacancy_seventh_month', 'k2_vacancy_current_month', 'k2_vacancy_next_month',
            'k2_vacancy_third_month', 'k2_vacancy_fourth_month', 'k2_vacancy_fifth_month',
            'k2_vacancy_sixth_month', 'k2_vacancy_seventh_month', 'food_offered',
            'second_languages_offered', 'spark_certified', 'weekday_full_day', 'saturday',
            'scheme_type', 'extended_operating_hours', 'provision_of_transport', 'government_subsidy',
            'gst_registration', 'last_updated', 'remarks'
        ]

class UserHDBSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserHDBSearch
        fields = [
            'search_query', 'month', 'town', 'flat_type', 'block', 'street_name',
            'storey_range', 'floor_area_sqm', 'flat_model', 'lease_commence_date',
            'remaining_lease', 'resale_price'
        ]