import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import InteractiveMap from "./components/InteractiveMap";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home"; 
import Radon from "./pages/Radon";
import Asbestos from "./pages/Asbestos";
import Lead from "./pages/Lead";


function App() {
  const [data, setData] = useState([{}]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <header className="App-header">
          <h2>Building a Sustainable Future Through Property Insights</h2>

        </header>
        <main>
          <Routes>
            {/* Define routes for each page */}
            <Route path="/" element={<Home />} />
            <Route path="/Radon" element={<Radon />} />
            <Route path="/Asbestos" element={<Asbestos />} />
            <Route path="/Lead" element={<Lead />} />
            <Route path="/about" element={<About />} />
            <Route path="/ressources" element={<Ressources />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
