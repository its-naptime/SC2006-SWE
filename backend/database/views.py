from django.shortcuts import render
from django.http import JsonResponse
from .models import preschool_centre
from .models import preschool_charges
from .models import school_info
from .models import school_cca

# Create your views here.
def preschool_centre_list(request):
    centres = preschool_centre.objects.all()
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
        centre = preschool_centre.objects.get(pk=pk)
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
    except preschool_centre.DoesNotExist:
        data = {"error": "Preschool Centre not found"}
    return JsonResponse(data)

def preschool_charges_list(request):
    charges = preschool_charges.objects.all()
    data = {"charges": list(charges.values(
        'centre_code', 'centre_name', 'incidental_charges', 'frequency', 'amount'
    ))}
    return JsonResponse(data)

def preschool_charges_detail(request, pk):
    try:
        charge = preschool_charges.objects.get(pk=pk)
        data = {"charge": {
            "centre_code": charge.centre_code,
            "centre_name": charge.centre_name,
            "incidental_charges": charge.incidental_charges,
            "frequency": charge.frequency,
            "amount": charge.amount
        }}
    except preschool_charges.DoesNotExist:
        data = {"error": "Preschool Charge not found"}
    return JsonResponse(data)

def school_info_list(request):
    schools = school_info.objects.all()
    data = {"schools": list(schools.values(
        'school_name', 'url_address', 'address', 'postal_code', 'telephone_no', 
        'telephone_no_2', 'fax_no', 'fax_no_2', 'email_address', 'mrt_desc', 
        'bus_desc', 'principal_name', 'first_vp_name', 'second_vp_name', 
        'third_vp_name', 'fourth_vp_name', 'fifth_vp_name', 'sixth_vp_name', 
        'dgp_code', 'zone_code', 'type_code', 'nature_code', 'session_code', 
        'mainlevel_code', 'sap_ind', 'autonomous_ind', 'gifted_ind', 'ip_ind', 
        'mothertongue1_code', 'mothertongue2_code', 'mothertongue3_code'
    ))}
    return JsonResponse(data)

def school_info_detail(request, pk):
    try:
        school = school_info.objects.get(pk=pk)
        data = {"school": {
            "school_name": school.school_name,
            "url_address": school.url_address,
            "address": school.address,
            "postal_code": school.postal_code,
            "telephone_no": school.telephone_no,
            "telephone_no_2": school.telephone_no_2,
            "fax_no": school.fax_no,
            "fax_no_2": school.fax_no_2,
            "email_address": school.email_address,
            "mrt_desc": school.mrt_desc,
            "bus_desc": school.bus_desc,
            "principal_name": school.principal_name,
            "first_vp_name": school.first_vp_name,
            "second_vp_name": school.second_vp_name,
            "third_vp_name": school.third_vp_name,
            "fourth_vp_name": school.fourth_vp_name,
            "fifth_vp_name": school.fifth_vp_name,
            "sixth_vp_name": school.sixth_vp_name,
            "dgp_code": school.dgp_code,
            "zone_code": school.zone_code,
            "type_code": school.type_code,
            "nature_code": school.nature_code,
            "session_code": school.session_code,
            "mainlevel_code": school.mainlevel_code,
            "sap_ind": school.sap_ind,
            "autonomous_ind": school.autonomous_ind,
            "gifted_ind": school.gifted_ind,
            "ip_ind": school.ip_ind,
            "mothertongue1_code": school.mothertongue1_code,
            "mothertongue2_code": school.mothertongue2_code,
            "mothertongue3_code": school.mothertongue3_code
        }}
    except school_info.DoesNotExist:
        data = {"error": "School not found"}
    return JsonResponse(data)

def school_cca_list(request):
    ccas = school_cca.objects.all()
    data = {"ccas": list(ccas.values(
        'school_name', 'school_section', 'cca_grouping_desc', 'cca_generic_name', 
        'cca_customized_name'
    ))}
    return JsonResponse(data)

def school_cca_detail(request, pk):
    try:
        cca = school_cca.objects.get(pk=pk)
        data = {"cca": {
            "school_name": cca.school_name,
            "school_section": cca.school_section,
            "cca_grouping_desc": cca.cca_grouping_desc,
            "cca_generic_name": cca.cca_generic_name,
            "cca_customized_name": cca.cca_customized_name
        }}
    except school_cca.DoesNotExist:
        data = {"error": "CCA not found"}
    return JsonResponse(data)