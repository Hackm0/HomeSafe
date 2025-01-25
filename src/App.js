import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import React from "react";
import InteractiveMap from "./components/InteractiveMap";
import './index.css'; // Facultatif, si vous utilisez un fichier global CSS
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <h1>PREDECTION</h1>
      <h2>Building a Sustainable Future Through Property Insights</h2>
      <InteractiveMap />
    </div>
  );
}

export default App;
