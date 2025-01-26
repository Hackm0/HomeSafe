import React, {useState, useEffect} from 'react';
import './App.css';
import Navbar from './Navbar';
import InteractiveMap from "./components/InteractiveMap"

function App() {
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/members")
    .then(res => res.json())
    .then(data => {setData(data)
      console.log(data)
    }
  )}, [])
  
  return (
    <div className="App">
      <Navbar></Navbar>
      <h1>PREDECTION</h1>
      <h2>Building a Sustainable Future Through Property Insights</h2>
      <InteractiveMap></InteractiveMap>
        {(typeof data.members === 'undefined') ? (
            <p>Loading...</p>
        ) : (
          data.members.map((member, i) => (
            <p key={i}>{member}</p>
          ))
        )}
    </div>
  );
}

export default App;
