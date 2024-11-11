# services/nearby_search_service.py
from typing import Dict, Any
from math import radians, cos, sin, asin, sqrt
from django.db.models import Q
from database.models import HDB_data, school_info, preschool_centre
from database.serializers import HDBDataSerializer, SchoolInfoSerializer, PreschoolCentreSerializer

class NearbySearchService:
    def execute_search(self, params: Dict[str, Any]) -> Dict[str, Any]:
        try:
            print("Received nearby search params:", params)  # Debug print

            search_type = params.get('type')
            latitude = float(params.get('latitude', 0))
            longitude = float(params.get('longitude', 0))
            radius = float(params.get('radius', 2))  # Default 2km radius
            exclude_id = params.get('exclude_id')

            print(f"Processing nearby search: type={search_type}, lat={latitude}, lng={longitude}, radius={radius}")  # Debug print

            if not all([search_type, latitude, longitude]):
                missing = []
                if not search_type: missing.append("type")
                if not latitude: missing.append("latitude")
                if not longitude: missing.append("longitude")
                error_msg = f"Missing required parameters: {', '.join(missing)}"
                print(error_msg)  # Debug print
                raise ValueError(error_msg)

            def haversine_distance(lat1, lon1, lat2, lon2):
                """Calculate the distance between two points in kilometers"""
                R = 6371  # Earth's radius in kilometers

                lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
                dlat = lat2 - lat1
                dlon = lon2 - lon1

                a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
                c = 2 * asin(sqrt(a))
                return R * c

            # Calculate bounding box for initial filtering
            # 1 degree of latitude is approximately 111 kilometers
            lat_range = radius / 111.0
            # 1 degree of longitude varies with latitude
            lon_range = radius / (111.0 * cos(radians(latitude)))

            lat_min = latitude - lat_range
            lat_max = latitude + lat_range
            lon_min = longitude - lon_range
            lon_max = longitude + lon_range

            results = []
            if search_type == 'hdb':
                print("Searching for nearby HDB properties")  # Debug print
                queryset = HDB_data.objects.filter(
                    block__isnull=False,  # ensure block exists
                    street_name__isnull=False  # ensure street_name exists
                )
                if exclude_id:
                    queryset = queryset.exclude(id=exclude_id)
                
                # Take first 50 for distance calculation
                properties = queryset[:50]
                for prop in properties:
                    try:
                        # Get coordinates (you'll need to implement this based on your data structure)
                        prop_lat = float(prop.latitude) if prop.latitude else None
                        prop_lng = float(prop.longitude) if prop.longitude else None
                        
                        if prop_lat and prop_lng:
                            distance = haversine_distance(latitude, longitude, prop_lat, prop_lng)
                            if distance <= radius:
                                prop_data = HDBDataSerializer(prop).data
                                prop_data['distance'] = round(distance, 2)
                                results.append(prop_data)
                    except Exception as e:
                        print(f"Error processing HDB property {prop.id}: {str(e)}")
                        continue

            elif search_type == 'school':
                print("Searching for nearby schools")  # Debug print
                queryset = school_info.objects.filter(
                    address__isnull=False  # ensure address exists
                )
                if exclude_id:
                    queryset = queryset.exclude(id=exclude_id)
                
                # Take first 50 for distance calculation
                schools = queryset[:50]
                for school in schools:
                    try:
                        # Get coordinates (you'll need to implement this based on your data structure)
                        school_lat = float(school.latitude) if school.latitude else None
                        school_lng = float(school.longitude) if school.longitude else None
                        
                        if school_lat and school_lng:
                            distance = haversine_distance(latitude, longitude, school_lat, school_lng)
                            if distance <= radius:
                                school_data = SchoolInfoSerializer(school).data
                                school_data['distance'] = round(distance, 2)
                                results.append(school_data)
                    except Exception as e:
                        print(f"Error processing school {school.id}: {str(e)}")
                        continue

            elif search_type == 'preschool':
                print("Searching for nearby preschools")  # Debug print
                queryset = preschool_centre.objects.filter(
                    centre_address__isnull=False  # ensure address exists
                )
                if exclude_id:
                    queryset = queryset.exclude(id=exclude_id)
                
                # Take first 50 for distance calculation
                preschools = queryset[:50]
                for preschool in preschools:
                    try:
                        # Get coordinates (you'll need to implement this based on your data structure)
                        preschool_lat = float(preschool.latitude) if preschool.latitude else None
                        preschool_lng = float(preschool.longitude) if preschool.longitude else None
                        
                        if preschool_lat and preschool_lng:
                            distance = haversine_distance(latitude, longitude, preschool_lat, preschool_lng)
                            if distance <= radius:
                                preschool_data = PreschoolCentreSerializer(preschool).data
                                preschool_data['distance'] = round(distance, 2)
                                results.append(preschool_data)
                    except Exception as e:
                        print(f"Error processing preschool {preschool.id}: {str(e)}")
                        continue

            else:
                error_msg = f"Invalid search type: {search_type}"
                print(error_msg)  # Debug print
                raise ValueError(error_msg)

            # Sort results by distance
            results = sorted(results, key=lambda x: x['distance'])[:10]  # Return top 10 closest

            print(f"Found {len(results)} nearby {search_type}s")  # Debug print
            return {
                'type': search_type,
                'results': results,
                'total': len(results)
            }

        except Exception as e:
            print(f"Error in nearby search: {str(e)}")  # Debug print
            import traceback
            traceback.print_exc()  # Print full stack trace
            raise