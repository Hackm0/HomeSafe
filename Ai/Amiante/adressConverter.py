import pandas as pd
import time
import requests

# Initialize Mapbox API key
api_key = "pk.eyJ1Ijoib2xpdmllci1oYW1lbCIsImEiOiJjbTZjcGsyYXkwazlmMmpxMXZ2MDJxOHl2In0.vEv-xQBXropz4T_zFY2PXA"  # Replace with your Mapbox API key

# Function to get latitude and longitude using Mapbox
def get_lat_lon(address):
    try:
        url = f"https://api.mapbox.com/geocoding/v5/mapbox.places/{address}.json"
        params = {
            'access_token': api_key,
            'limit': 1
        }
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        if data['features']:
            coords = data['features'][0]['geometry']['coordinates']
            return coords[1], coords[0]  # Latitude, Longitude
        else:
            return None, None
    except requests.exceptions.RequestException as e:
        print(f"Error geocoding {address}: {e}")
        return None, None

# Load your CSV file
file_path = r"Ai\data\dateOfConstrucitonBuildingClean.csv"  # Replace with your CSV file path
df = pd.read_csv(file_path, delimiter=';')

# Check if the column 'add_compl' exists
if 'add_compl' not in df.columns:
    raise ValueError("The column 'add_compl' does not exist in the CSV file.")

# Replace 'add_compl' with latitude and longitude
df[['Latitude', 'Longitude']] = df['add_compl'].apply(
    lambda addr: pd.Series(get_lat_lon(addr))
)

# Drop the 'add_compl' column
df = df.drop(columns=['add_compl'])

# Save to a new CSV
output_path = r"Ai\data\resulatLonLat.csv"  # Replace with your desired output file path
df.to_csv(output_path, index=False)
print(f"Updated CSV saved to {output_path}")