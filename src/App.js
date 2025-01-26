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
        <main>
          <Routes>
            {/* Define routes for each page */}
            <Route path="/" element={<Home />} />
            <Route path="/radon" element={<Radon />} />
            <Route path="/asbestos" element={<Asbestos />} />
            <Route path="/lead" element={<Lead />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
