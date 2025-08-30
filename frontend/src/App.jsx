import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



export default function App() {
  const [status, setStatus] = useState("");
  const [gps, setGps] = useState(null);

  // Get user's GPS location
  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGps({ lat: position.coords.latitude, lng: position.coords.longitude });
        setStatus("Location acquired.");
      },
      () => setStatus("Geolocation permission denied.")
    );
  };

  // Fake FACEIO Authentication for now - replace with real FACEIO logic
  const faceLogin = async () => {
    setStatus("Starting face authentication...");
    try {
      // Simulate face recognition success with a dummy facial ID
      const userData = { facialId: "dummy-facial-id-1234" };

      // Now get GPS after face auth
      getLocation();

      // Wait a moment so GPS can update
      setTimeout(async () => {
        setStatus("Sending login attempt...");
        await fetch("http://localhost:3001/api/auth/face", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            facialId: userData.facialId,
            gps,
          }),
        });
        setStatus("Login attempt sent.");
      }, 1500);
    } catch (err) {
      setStatus("Face authentication failed.");
    }
  };

  return (
    <><div>
      <a href="https://vite.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div><div style={{ padding: 20 }}>
        <h2>Face Recognition Login</h2>
        <button onClick={faceLogin}>Login with Face</button>
        <p>Status: {status}</p>
        <p>GPS: {gps ? `Lat: ${gps.lat}, Lng: ${gps.lng}` : "No location yet"}</p>
      </div></>
  );
}