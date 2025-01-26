import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import About from "./pages/About"; // New page
import Home from "./pages/Home"; // New page
import Ressources from "./pages/Ressources"; // New page

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
            <Route path="/about" element={<About />} />
            <Route path="/ressources" element={<Ressources />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
