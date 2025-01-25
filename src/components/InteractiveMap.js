import 'leaflet/dist/leaflet.css';
import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from "react-leaflet";
import axios from "axios";

//clé : ae1923fb87b5410682431d61026c42ac

const InteractiveMap = () => {
    const [position, setPosition] = useState(null);
    const [address, setAddress] = useState("");
  
    const fetchAddress = async (lat, lng) => {
      const apiKey = "CLE_API"; // Replace with your OpenCage API key
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;
      try {
        const response = await axios.get(url);
        const results = response.data.results;
        if (results && results.length > 0) {
          setAddress(results[0].formatted);
        } else {
          setAddress("Adresse introuvable.");
        }
      } catch (error) {
        setAddress("Erreur lors de la récupération de l'adresse.");
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
  
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <div style={{ flex: 1, padding: "20px" }}>
          <h1>Address</h1>
          <p>Enter your address or click on your home.</p>
          {position && (
            <div>
              <h3>Selected Address:</h3>
              <p>{address || "Fetching address..."}</p>
            </div>
          )}
        </div>
        <div style={{ width: "40vw", height: "70vh", margin: "auto", border: "1px solid #ccc" }}>
          <MapContainer center={[45.5017, -73.5673]} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapClickHandler />
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