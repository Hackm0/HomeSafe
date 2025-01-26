import pandas as pd
import numpy as np

def find_closest_plomb(file_path, input_lon, input_lat):
    df = pd.read_csv(file_path, delimiter=';')

    df['distance_squared'] = (df['lon'] - input_lon) ** 2 + (df['lat'] - input_lat) ** 2

    closest_row = df.loc[df['distance_squared'].idxmin()]

    return closest_row['Plomb']
