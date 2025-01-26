import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, useMap } from "react-leaflet";
import axios from "axios";
// clé OpenCage : ae1923fb87b5410682431d61026c42ac

const InteractiveMap = () => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState("");
  const [inputAddress, setInputAddress] = useState("");

  const fetchAddress = async (lat, lng) => {
    const apiKey = "ae1923fb87b5410682431d61026c42ac"; // Replace with your OpenCage API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      const results = response.data.results;
      if (results && results.length > 0) {
        setAddress(results[0].formatted);
        setInputAddress(results[0].formatted); // Update input field
      } else {
        setAddress("Adresse introuvable.");
      }
    } catch (error) {
      setAddress("Erreur lors de la récupération de l'adresse.");
    }
  };

  const fetchCoordinates = async (input) => {
    const apiKey = "ae1923fb87b5410682431d61026c42ac"; // Replace with your OpenCage API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(input)}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      const results = response.data.results;
      if (results && results.length > 0) {
        const { lat, lng } = results[0].geometry;
        setPosition([lat, lng]);
        setAddress(results[0].formatted);
      } else {
        setAddress("Adresse introuvable.");
      }
    } catch (error) {
      setAddress("Erreur lors de la récupération de l'adresse.");
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
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ width: "80%", textAlign: "center", marginBottom: "20px" }}>
        <h1>Address</h1>
        <p>Enter your address or click on your home.</p>
        <form onSubmit={handleInputSubmit} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            value={inputAddress}
            onChange={handleInputChange}
            placeholder="Enter an address"
            style={{
              width: "60%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginBottom: "10px"
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
      </div>
      <div style={{ width: "80%", height: "50vh", border: "1px solid #ccc" }}>
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
