from flask import Flask
from flask_cors import CORS

from methods.modelPrediction import predict_asbestos
import methods.ageBatiment as batiments

app = Flask(__name__)
CORS(app)  # This will allow all origins by default


#Member API route
@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

if __name__ == "__main__":
    batiment = batiments.load_buildings_data("methods/data/anneeBatiment.csv")

    # Example call to `predict_asbestos` with random values
    lon = -73.5673
    lat = 45.5017

    year_of_construction = batiments.estimate_building_year(lat, lon, batiment)

    if not year_of_construction : 
        year_of_construction = 1990
     
    confidence = predict_asbestos(lon, lat, year_of_construction)
    print(f"Predicted confidence of asbestos presence: {confidence}")

    app.run(debug=True)