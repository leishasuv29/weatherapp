import React, { useState } from 'react';
import './App.css';

const api = {
  key: 'd205d562d1487f0b3f2a42235feda4dd',
  base: "https://api.openweathermap.org/data/2.5/weather?"
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(""); // To store error messages

  const searchPressed = () => {
    fetch(`${api.base}q=${search}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        if (result.cod === 200) { // Check if API returned a valid response
          setWeather(result);
          setError(""); // Clear any previous error messages
        } else {
          setError(result.message); // Display error message
          setWeather({}); // Clear weather data
        }
      })
      .catch(err => {
        console.error("Error fetching weather data:", err);
        setError("An error occurred. Please try again later.");
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* HEADER */}
        <h1>Weather App</h1>

        {/* Search Box */}
        <div>
          <input 
            type="text"
            placeholder="Enter city/town..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>

        {/* Display Error Message */}
        {error && <p className="error">{error}</p>}

        {/* Display Weather Data */}
        {weather.main && (
          <div className="weather-data">
            {/* Location */}
            <p>{weather.name}, {weather.sys?.country}</p>

            {/* Temperature */}
            <p className="temp">{Math.round(weather.main?.temp)}°C</p>

            {/* Condition */}
            <div>
              <p>{weather.weather?.[0].main}</p>
              <p className="description">{weather.weather?.[0].description}</p>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
