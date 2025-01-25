import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, useMap } from "react-leaflet";
import axios from "axios";

const InteractiveMap = () => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [processedValue, setProcessedValue] = useState("");

  const fetchAddress = async (lat, lng) => {
    const apiKey = "CLE_API_A_METTRE"; // Replace with your OpenCage API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      const results = response.data.results;
      if (results && results.length > 0) {
        setAddress(results[0].formatted);
        setInputAddress(results[0].formatted);
        processAddress(results[0].formatted); // Send address to backend for processing
      } else {
        setAddress("Adresse introuvable.");
      }
    } catch (error) {
      setAddress("Erreur lors de la récupération de l'adresse.");
    }
  };

  const fetchCoordinates = async (input) => {
    const url = `http://127.0.0.1:5000/api/coordinates?address=${encodeURIComponent(input)}`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      if (data.lat && data.lng) {
        setPosition([data.lat, data.lng]);
        setAddress(data.address);
        processAddress(data.address); // Send address to backend for processing
      } else {
        setAddress("Adresse introuvable.");
      }
    } catch (error) {
      setAddress("Erreur lors de la récupération de l'adresse.");
    }
  };

  const processAddress = async (address) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/process-address", { address });
      setProcessedValue(response.data.processed);
    } catch (error) {
      setProcessedValue("Error processing address.");
    }
  };

  const handleInputChange = (e) => {
    setInputAddress(e.target.value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (inputAddress) {
      fetchCoordinates(inputAddress);
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        fetchAddress(lat, lng);
      },
    });
    return null;
  };

  const CenterMap = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      if (position) {
        map.setView(position, map.getZoom());
      }
    }, [position, map]);
    return null;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", padding: "20px" }}>
      <div style={{ maxWidth: "600px", width: "100%", padding: "20px", textAlign: "center" }}>
        <h1>Address</h1>
        <p>Enter your address or click on your home.</p>
        <form onSubmit={handleInputSubmit} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            value={inputAddress}
            onChange={handleInputChange}
            placeholder="Enter an address"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </form>
        {position && (
          <div>
            <h3>Selected Address:</h3>
            <p>{address || "Fetching address..."}</p>
          </div>
        )}
        {processedValue && (
          <div>
            <h3>Processed Value:</h3>
            <p>{processedValue}</p>
          </div>
        )}
      </div>
      <div style={{ width: "100%", height: "50vh", maxWidth: "900px", margin: "auto", border: "1px solid #ccc" }}>
        <MapContainer center={[45.5017, -73.5673]} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapClickHandler />
          <CenterMap position={position} />
          {position && (
            <Marker position={position}>
              <Popup>{address || "Chargement de l'adresse..."}</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default InteractiveMap;
