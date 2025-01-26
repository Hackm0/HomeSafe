import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, useMap } from "react-leaflet";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, Cell } from "recharts";

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
  
if (result.ok) {
  const plombLevel = resultInJson.plomb_level || 0;

  // Transform plomb_level based on the given conditions
  const transformedPlombLevel =
    plombLevel === 60
      ? 100
      : plombLevel === 15
      ? 0
      : 50;

  const chartData = [
    { name: "Asbestos (%)", value: resultInJson.confidence || 0 },
    { name: "Radon (%)", value: resultInJson.radon_probability || 0 },
    { name: "Lead Level (%)", value: transformedPlombLevel },
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

  const handleBarClick = (data) => {
    // Remove everything from '%' onwards, including encoded or malformed content
    const rawName = data.name; // Split on '%' to remove it and anything after
    //asbestos%20(%)
    //radon%20(%)
    // plomb%20level
    console.log(rawName);
    if (rawName == "Asbestos (%)") {
      window.location.href = "asbestos"
    } else if (rawName == "Radon (%)") {
      window.location.href = "Radon"
    } else if (rawName == "Lead Level (%)") {
      window.location.href = "lead"
    }
    //window.location.href = rawName;
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
        <h1 className="text-4xl font-bold text-green-900 mb-4">Enter your address or click on the map</h1>
        <h3> For this beta, our support is currently limited to Montréal. </h3>
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
                margin: "10px",
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
            <Bar
              dataKey="value"
              radius={[10, 10, 0, 0]}
              onClick={handleBarClick}// Add pointer cursor
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.value > 55 ? "red" : "var(--chart-1)"}
                  style={{
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.fill = "#f0ad4e"; // Change color on hover
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.fill = entry.value > 55 ? "red" : "var(--chart-1)"; // Reset color
                  }}
                />
              ))}
              <LabelList dataKey="value" position="top" offset={10} fontSize={12} />
            </Bar>
          </BarChart>
          <p style={{ fontSize: "14px", color: "var(--foreground)", marginBottom: "10px", textAlign: "center" }}>
            Click on the bars for more details.
          </p>
        </div>

        
        <div class="bg-green-50 p-6 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold text-green-900 mb-4">Understanding the Numbers: Asbestos, Radon, and Lead</h3>
        <p class="text-gray-800 mb-4">
            These numbers represent the estimated likelihood or presence of harmful substances in your home—important data to help you make informed decisions about your health and safety.
          </p>

          <section class="mb-6">
            <h3 class="text-md font-semibold text-green-800 mb-2">Asbestos Risk</h3>
            <p class="text-gray-800 leading-relaxed">
              The asbestos percentage reflects the estimated probability that your home contains asbestos. For instance, a score of 75% indicates a 75% likelihood of asbestos presence in your home, which is a concern as asbestos exposure can lead to serious health issues. This estimation is powered by our advanced AI model, which analyzes factors such as the age of your home, construction materials, and historical data. However, this is a predictive tool, not a definitive analysis, and <strong>professional testing</strong> is required for accurate results.
            </p>
          </section>

          <section class="mb-6">
            <h3 class="text-md font-semibold text-green-800 mb-2">Radon Levels</h3>
            <p class="text-gray-800 leading-relaxed">
              The radon data reflects the estimated radon levels in your area, using precise, government-provided data specific to your postal or ZIP code. Radon is a naturally occurring gas that can accumulate in homes, particularly in basements and lower levels, posing long-term health risks like lung cancer. This localized estimate provides a helpful starting point for understanding potential radon risks in your home, but <strong>professional testing</strong> is always recommended to confirm levels.
            </p>
          </section>

          <section class="mb-6">
            <h3 class="text-md font-semibold text-green-800 mb-2">Lead in Water</h3>
            <p class="text-gray-800 leading-relaxed">
              The lead presence indicator shows whether lead has been detected in your water supply, based on accurate data sourced from government records. Lead contamination often originates from aging pipes or municipal water systems and poses significant health risks, especially to young children and pregnant women. While this information is highly precise, it serves as a general guideline, and we encourage homeowners to perform water testing for confirmation.
            </p>
          </section>

          <section>
            <h3 class="text-md font-semibold text-green-800 mb-2">Why These Estimates Matter</h3>
            <p class="text-gray-800 leading-relaxed mb-4">
              While these numbers are rooted in reliable data and predictive models, it's essential to understand that they are <strong>only estimates</strong>. They are designed to provide you with an initial indication of potential risks, helping you decide whether further investigation and professional testing are necessary. For definitive answers, we strongly recommend consulting certified specialists who can conduct detailed assessments of asbestos, radon, and lead in your home.
            </p>
            <p class="text-gray-800 leading-relaxed">
              Your health and safety are our priority—use these insights as a proactive step toward creating a safer living environment for you and your loved ones.
            </p>
          </section>
      </div>
    </div>
    </div>
    );
};

export default InteractiveMap;
