from flask import Flask, request, jsonify
from flask_cors import CORS

from methods.modelPrediction import predict_asbestos
import methods.ageBatiment as batiments
from methods.radonLevel import load_data, getRadonProbability
from methods.plomb import find_closest_plomb

app = Flask(__name__)
CORS(app) 

building_data = batiments.load_buildings_data("methods/data/anneeBatiment.csv")
radon_data = load_data("methods/data/radonLevel.csv")
plomb_file = "methods/data/plomb.csv"

# @app.route("/members", methods=["GET"])
# def members():
#     return jsonify({"members": ["Member1", "Member2", "Member3"]})

@app.route('/lebron', methods=['POST'])
def handle_prediction_request():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid request. No data provided."}), 400  # Bad Request

    latitude = data.get('lat')
    longitude = data.get('lng')
    postal_code = data.get('postalCode')  # Get the postal code
    postal_code = postal_code[:3]


    print(f"Received POST request to /lebron: {data} POSTALE CODE : {postal_code}")
    
    if latitude is None or longitude is None or postal_code is None:
        return jsonify({"error": "Latitude, longitude, and postal code are required."}), 400

    try:
        year_of_construction = batiments.estimate_building_year(latitude, longitude, building_data)
        if not year_of_construction:
            year_of_construction = 1990  # Default year if estimation fails

        confidence = predict_asbestos(longitude, latitude, year_of_construction) * 100
        
        radon_probability = getRadonProbability(radon_data, postal_code)

        plomb_level = find_closest_plomb(plomb_file, longitude, latitude)

        print(f"Predicted confidence of asbestos presence: {confidence} year estimated {year_of_construction}")
        print(f"Radon probability for postal code {postal_code}: {radon_probability}")
        print(f"Lead level : {plomb_level}")
        print(f"DEBUG - Type of radon_probability: {type(radon_probability)}")
        print(f"DEBUG - Type of plomb_level: {type(plomb_level)}")


        return jsonify({
            "message": "Prediction made successfully!",
            "lat": latitude,
            "lng": longitude,
            "postalCode": postal_code,  # Include postal code in the response
            "confidence": confidence,
            "radon_probability": radon_probability,  # Add radon_probability
            "plomb_level": plomb_level,
            "year_of_construction": year_of_construction
        }), 200  # OK

    except Exception as e:
        # Log and return an error if something fails
        print(f"Error during prediction: {e}")
        return jsonify({"error": "An error occurred during prediction. Please try again."}), 500


if __name__ == "__main__":
    app.run(debug=True)