import React from "react";
import InteractiveMap from "./components/InteractiveMap";
import './index.css'; // Facultatif, si vous utilisez un fichier global CSS

function App() {
  return (
    <div>
      <h1>Enter your informations</h1>
      <InteractiveMap />
    </div>
  );
}

export default App;
