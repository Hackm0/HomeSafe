import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, useMap } from "react-leaflet";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import axios from "axios";

// Override the default icon URL with the correct path
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

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
  const [chartData, setChartData] = useState([]);

  const fetchAddress = async (lat, lng) => {
    const apiKey = "ae1923fb87b5410682431d61026c42ac";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      const results = response.data.results;
      if (results && results.length > 0) {
        fetchCoordinates(results[0].formatted);
        // setAddress(results[0].formatted);
        // setPostalCode(results[0].components.partial_postcode || results[0].components.postcode);
        // setInputAddress(results[0].formatted);
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
  
        const myData = { lat, lng, postalCode: results[0].components.partial_postcode || results[0].components.postcode };
        const result = await fetch("/lebron", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(myData),
        });
  
        const resultInJson = await result.json();
        console.log(resultInJson); // Debug the response
  
        if (result.ok) {
          const chartData = [
            { name: "Asbestos (%)", value: resultInJson.confidence || 0 },
            { name: "Radon (%)", value: resultInJson.radon_probability || 0 },
            { name: "Plomb Level", value: resultInJson.plomb_level || 0 },
          ];
          setChartData(chartData);
        }
      }
    } catch (error) {
      console.error("Error:", error);
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
        alignItems: "center",
        padding: "20px",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h3>Address</h3>
          <p>Enter your address or click on the map.</p>
          <form onSubmit={handleInputSubmit} style={{ marginBottom: "10px" }}>
            <input
              type="text"
              value={inputAddress}
              onChange={handleInputChange}
              placeholder="Enter an address"
              style={{
                width: "80%",
                padding: "10px",
                fontSize: "16px",
                border: `1px solid var(--border)`,
                borderRadius: "4px",
                marginBottom: "10px",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
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

        <div
          style={{
            width: "100%",
            height: "400px",
            border: `1px solid var(--border)`,
            boxSizing: "border-box",
          }}
        >
          <MapContainer
            center={[45.5017, -73.5673]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
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

        <div
          style={{
            width: "100%",
            padding: "20px",
            border: `1px solid var(--border)`,
            borderRadius: "8px",
            backgroundColor: "var(--card)",
            color: "var(--card-foreground)",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            boxSizing: "border-box",
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>Prediction Results</h2>
          <BarChart
            width={760}
            height={300}
            data={chartData}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid vertical={false} stroke="var(--border)" />
            <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
            <Bar dataKey="value" fill="var(--chart-1)" radius={[10, 10, 0, 0]}>
              <LabelList dataKey="value" position="top" offset={10} fontSize={12} />
            </Bar>
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
