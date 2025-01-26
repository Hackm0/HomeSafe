from flask import Flask, request, jsonify
from flask_cors import CORS

from methods.modelPrediction import predict_asbestos
import methods.ageBatiment as batiments

app = Flask(__name__)
CORS(app) 

building_data = batiments.load_buildings_data("methods/data/anneeBatiment.csv")

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

    print(f"Received POST request to /lebron: {data}")
    
    if latitude is None or longitude is None or postal_code is None:
        return jsonify({"error": "Latitude, longitude, and postal code are required."}), 400

    try:
        year_of_construction = batiments.estimate_building_year(latitude, longitude, building_data)
        if not year_of_construction:
            year_of_construction = 1990  # Default year if estimation fails

        confidence = predict_asbestos(longitude, latitude, year_of_construction)
        
        print(f"Predicted confidence of asbestos presence: {confidence}")

        return jsonify({
            "message": "Prediction made successfully!",
            "lat": latitude,
            "lng": longitude,
            "postalCode": postal_code,  # Include postal code in the response
            "confidence": confidence,
            "year_of_construction": year_of_construction
        }), 200  # OK

    except Exception as e:
        # Log and return an error if something fails
        print(f"Error during prediction: {e}")
        return jsonify({"error": "An error occurred during prediction. Please try again."}), 500


if __name__ == "__main__":
    app.run(debug=True)
