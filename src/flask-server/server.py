from flask import Flask, request, jsonify
from flask_cors import CORS

from methods.modelPrediction import predict_asbestos

app = Flask(__name__)
CORS(app)  # This will allow all origins by default


# Member API route
@app.route("/members", methods=["GET"])
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

@app.route('/lebron', methods=['POST'])
def add_kyrie():
    data = request.get_json()  # Get JSON data from the POST request
    lat = data.get('lat')
    lng = data.get('lng')
    print(f"Received POST request to /lebron: {data}")
    # Process the data (e.g., save to a database)
    return jsonify({"message": "Member added successfully!", "lat": lat, "lng": lng}), 201  # 201 Created status code

if __name__ == "__main__":
    # Example call to `predict_asbestos` with random values
    lon = -73.5673
    lat = 45.5017
    year_of_construction = 1980

    confidence = predict_asbestos(lon, lat, year_of_construction)
    print(f"Predicted confidence of asbestos presence: {confidence}")

    app.run(debug=True)