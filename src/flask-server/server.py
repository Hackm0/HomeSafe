import os
from flask import Flask
from flask_cors import CORS
import pandas as pd
import joblib


app = Flask(__name__)
CORS(app)  # This will allow all origins by default

base_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(base_dir, "model", "asbestos_model.pkl")
model = joblib.load(model_path)

# Function to predict confidence for asbestos presence
def predict_asbestos(lon, lat, year_of_construction):
    """
    Predict the confidence of asbestos presence for a given location.

    Args:
    lon (float): Longitude of the location.
    lat (float): Latitude of the location.
    year_of_construction (int or float): Average construction year of the location.

    Returns:
    float: Confidence score for asbestos presence (0 to 1).
    """
    input_data = pd.DataFrame({'year_of_construction': [year_of_construction], 'lat': [lat], 'lon': [lon]})
    probability = model.predict_proba(input_data)[:, 1][0]
    return probability

#Member API route
@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

if __name__ == "__main__":
    app.run(debug=True)