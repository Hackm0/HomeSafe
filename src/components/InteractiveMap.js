import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, useMap } from "react-leaflet";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import axios from "axios";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
];

const InteractiveMap = () => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [inputAddress, setInputAddress] = useState("");

  const fetchAddress = async (lat, lng) => {
    const apiKey = "ae1923fb87b5410682431d61026c42ac";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      const results = response.data.results;
      if (results && results.length > 0) {
        setAddress(results[0].formatted);
        setPostalCode(results[0].components.partial_postcode || results[0].components.postcode);
        setInputAddress(results[0].formatted);
      } else {
        setAddress("Adresse introuvable.");
      }
    } catch (error) {
      setAddress("Erreur lors de la récupération de l'adresse.");
    }
  };

  const fetchCoordinates = async (input) => {
    const apiKey = "ae1923fb87b5410682431d61026c42ac";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(input)}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      const results = response.data.results;
      if (results && results.length > 0) {
        const { lat, lng } = results[0].geometry;
        setPosition([lat, lng]);
        setAddress(results[0].formatted);
        setPostalCode(results[0].components.partial_postcode || results[0].components.postcode);
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {/* Map Section */}
      <div style={{ width: "100%", maxWidth: "800px", textAlign: "center" }}>
        <h1>Address</h1>
        <p>Enter your address or click on your home.</p>
        <form onSubmit={handleInputSubmit}>
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
            <p>Postal Code: {postalCode || "Fetching postal code..."}</p>
          </div>
        )}
      </div>
      <div style={{ width: "100%", maxWidth: "800px", height: "400px", border: "1px solid #ccc" }}>
        <MapContainer center={[45.5017, -73.5673]} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapClickHandler />
          <CenterMap position={position} />
          {position && (
            <Marker position={position}>
              <Popup>{address || "Fetching address..."}</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {/* Bar Chart Section */}
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>Bar Chart - Label</h2>
        <p style={{ marginBottom: "20px" }}>January - March 2024</p>
        <BarChart
          width={700}
          height={300}
          data={chartData}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <CartesianGrid vertical={false} stroke="#ccc" />
          <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
          <Bar dataKey="desktop" fill="#8884d8" radius={[10, 10, 0, 0]}>
            <LabelList dataKey="desktop" position="top" offset={10} fontSize={12} />
          </Bar>
        </BarChart>
        <div style={{ marginTop: "20px", color: "#666" }}>
          Trending up by 5.2% this quarter
        </div>
        <div style={{ color: "#999" }}>
          Showing total visitors for the first quarter
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
