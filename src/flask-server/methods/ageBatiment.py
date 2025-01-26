import csv
import math

def haversine_distance(lat1, lon1, lat2, lon2):
    """
    Calculate the great circle distance (in kilometers) between two points 
    on the earth (specified in decimal degrees).
    """
    # Convert decimal degrees to radians
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])

    # Haversine formula
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = (math.sin(dlat / 2) ** 2) + math.cos(lat1) * math.cos(lat2) * (math.sin(dlon / 2) ** 2)
    c = 2 * math.asin(math.sqrt(a))
    # Radius of Earth in kilometers: 6371
    km = 6371 * c
    return km

def load_buildings_data(buildings_file):
    """
    Load building data from the CSV file.
    """
    buildings = []
    with open(buildings_file, mode="r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f, delimiter=";")
        for row in reader:
            try:
                year = int(row["Year"])
                lat = float(row["Latitude"])
                lon = float(row["Longitude"])
                buildings.append((year, lat, lon))
            except (ValueError, KeyError):
                continue  # Skip rows with errors
    return buildings

def estimate_building_year(lat, lon, buildings, distance_threshold_km=0.5):
    """
    Estimate the average construction year of nearby buildings.
    """
    nearby_years = [
        bldg_year
        for bldg_year, bldg_lat, bldg_lon in buildings
        if haversine_distance(lat, lon, bldg_lat, bldg_lon) <= distance_threshold_km
    ]

    if nearby_years:
        avg_year = sum(nearby_years) / len(nearby_years)
        return avg_year
    else:
        return None
