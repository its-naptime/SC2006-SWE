from django.shortcuts import render
from django.http import JsonResponse
from .models import PreschoolCentre

# Create your views here.
def preschool_centre_list(request):
    centres = PreschoolCentre.objects.all()
    data = {"centres": list(centres.values(
        'tp_code', 'centre_name', 'organisation_code', 'organisation_description', 
        'service_model', 'centre_contact_no', 'centre_email_address', 'centre_address', 
        'postal_code', 'centre_website', 'infant_vacancy_current_month', 
        'infant_vacancy_next_month', 'infant_vacancy_third_month', 
        'infant_vacancy_fourth_month', 'infant_vacancy_fifth_month', 
        'infant_vacancy_sixth_month', 'infant_vacancy_seventh_month', 
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
        'scheme_type', 'extended_operating_hours', 'provision_of_transport', 
        'government_subsidy', 'gst_regisration', 'last_updated', 'remarks'
    ))}
    return JsonResponse(data)

def preschool_centre_detail(request, pk):
    try:
        centre = PreschoolCentre.objects.get(pk=pk)
        data = {"centre": {
            "id": centre.id,
            "name": centre.name,
            "address": centre.address,
            "phone": centre.phone,
            "email": centre.email,
            'tp_code': centre.tp_code,
            'centre_name': centre.centre_name,
            'organisation_code': centre.organisation_code,
            'organisation_description': centre.organisation_description,
            'service_model': centre.service_model,
            'centre_contact_no': centre.centre_contact_no,
            'centre_email_address': centre.centre_email_address,
            'centre_address': centre.centre_address,
            'postal_code': centre.postal_code,
            'centre_website': centre.centre_website,
            'infant_vacancy_current_month': centre.infant_vacancy_current_month,
            'infant_vacancy_next_month': centre.infant_vacancy_next_month,
            'infant_vacancy_third_month': centre.infant_vacancy_third_month,
            'infant_vacancy_fourth_month': centre.infant_vacancy_fourth_month,
            'infant_vacancy_fifth_month': centre.infant_vacancy_fifth_month,
            'infant_vacancy_sixth_month': centre.infant_vacancy_sixth_month,
            'infant_vacancy_seventh_month': centre.infant_vacancy_seventh_month,
            'pg_vacancy_current_month': centre.pg_vacancy_current_month,
            'pg_vacancy_next_month': centre.pg_vacancy_next_month,
            'pg_vacancy_third_month': centre.pg_vacancy_third_month,
            'pg_vacancy_fourth_month': centre.pg_vacancy_fourth_month,
            'pg_vacancy_fifth_month': centre.pg_vacancy_fifth_month,
            'pg_vacancy_sixth_month': centre.pg_vacancy_sixth_month,
            'pg_vacancy_seventh_month': centre.pg_vacancy_seventh_month,
            'n1_vacancy_current_month': centre.n1_vacancy_current_month,
            'n1_vacancy_next_month': centre.n1_vacancy_next_month,
            'n1_vacancy_third_month': centre.n1_vacancy_third_month,
            'n1_vacancy_fourth_month': centre.n1_vacancy_fourth_month,
            'n1_vacancy_fifth_month': centre.n1_vacancy_fifth_month,
            'n1_vacancy_sixth_month': centre.n1_vacancy_sixth_month,
            'n1_vacancy_seventh_month': centre.n1_vacancy_seventh_month,
            'n2_vacancy_current_month': centre.n2_vacancy_current_month,
            'n2_vacancy_next_month': centre.n2_vacancy_next_month,
            'n2_vacancy_third_month': centre.n2_vacancy_third_month,
            'n2_vacancy_fourth_month': centre.n2_vacancy_fourth_month,
            'n2_vacancy_fifth_month': centre.n2_vacancy_fifth_month,
            'n2_vacancy_sixth_month': centre.n2_vacancy_sixth_month,
            'n2_vacancy_seventh_month': centre.n2_vacancy_seventh_month,
            'k1_vacancy_current_month': centre.k1_vacancy_current_month,
            'k1_vacancy_next_month': centre.k1_vacancy_next_month,
            'k1_vacancy_third_month': centre.k1_vacancy_third_month,
            'k1_vacancy_fourth_month': centre.k1_vacancy_fourth_month,
            'k1_vacancy_fifth_month': centre.k1_vacancy_fifth_month,
            'k1_vacancy_sixth_month': centre.k1_vacancy_sixth_month,
            'k1_vacancy_seventh_month': centre.k1_vacancy_seventh_month,
            'k2_vacancy_current_month': centre.k2_vacancy_current_month,
            'k2_vacancy_next_month': centre.k2_vacancy_next_month,
            'k2_vacancy_third_month': centre.k2_vacancy_third_month,
            'k2_vacancy_fourth_month': centre.k2_vacancy_fourth_month,
            'k2_vacancy_fifth_month': centre.k2_vacancy_fifth_month,
            'k2_vacancy_sixth_month': centre.k2_vacancy_sixth_month,
            'k2_vacancy_seventh_month': centre.k2_vacancy_seventh_month,
            'food_offered': centre.food_offered,
            'second_languages_offered': centre.second_languages_offered,
            'spark_certified': centre.spark_certified,
            'weekday_full_day': centre.weekday_full_day,
            'saturday': centre.saturday,
            'scheme_type': centre.scheme_type,
            'extended_operating_hours': centre.extended_operating_hours,
            'provision_of_transport': centre.provision_of_transport,
            'government_subsidy': centre.government_subsidy,
            'gst_regisration': centre.gst_regisration,
            'last_updated': centre.last_updated,
            'remarks': centre.remarks
        }}
    except PreschoolCentre.DoesNotExist:
        data = {"error": "Preschool Centre not found"}
    return JsonResponse(data)