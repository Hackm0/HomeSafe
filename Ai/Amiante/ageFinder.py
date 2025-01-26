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

def process_data(houses_file, buildings_file):
    # 1. Read the buildings CSV
    buildings = []
    with open(buildings_file, mode="r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f, delimiter=";")
        for row in reader:
            try:
                # Convert year, lat, lon to correct types
                year = int(row["Year"])
                lat = float(row["Latitude"])
                lon = float(row["Longitude"])
                buildings.append((year, lat, lon))
            except (ValueError, KeyError):
                continue  # Skip rows with errors

    # 2. Read the houses CSV
    houses = []
    with open(houses_file, mode="r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                # Match correct column names
                address = row.get("Adresse", "")
                lat = float(row["Latitude"])
                lon = float(row["Longitude"])
                houses.append({
                    "Adresse": address,
                    "Latitude": lat,
                    "Longitude": lon,
                })
            except (ValueError, KeyError):
                continue  # Skip rows with errors

    # 3. Calculate nearby average building year for each house
    distance_threshold_km = 0.5  # 10 km radius
    results = []
    for house in houses:
        house_lat = house["Latitude"]
        house_lon = house["Longitude"]
        nearby_years = [
            bldg_year
            for bldg_year, bldg_lat, bldg_lon in buildings
            if haversine_distance(house_lat, house_lon, bldg_lat, bldg_lon) <= distance_threshold_km
        ]

        avg_year = sum(nearby_years) / len(nearby_years) if nearby_years else None
        results.append({
            "Adresse": house["Adresse"],
            "Latitude": house_lat,
            "Longitude": house_lon,
            "AverageConstructionYearNearby": avg_year
        })

    return results

def main():
    # File paths (adjust as necessary)
    houses_file = r"Ai\data\Partie_3_clean.csv"
    buildings_file = r"Ai\data\anneeBatiment.csv"
    output_file = r"Ai\data\houses_with_avg_year_3.csv"

    # Process the data
    results = process_data(houses_file, buildings_file)

    # Write results to a new CSV
    with open(output_file, mode="w", newline="", encoding="utf-8-sig") as f:
        fieldnames = ["Adresse", "Latitude", "Longitude", "AverageConstructionYearNearby"]
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for result in results:
            writer.writerow(result)

    print("Done! Results written to:", output_file)

if __name__ == "__main__":
    main()












