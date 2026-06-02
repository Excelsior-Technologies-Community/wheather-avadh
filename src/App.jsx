import { useState } from "react";

import{ useEffect } from "react";

import{FaWind} from "react-icons/fa";
import{FaDroplet} from "react-icons/fa6";

function App() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [lastCity, setLastCity] = useState("");

  const getWeather = async () => {
   if (!city || city === lastCity) return;

  setLastCity(city);

  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=77f3cb2fcfee45399c780454260206&q=${city}&aqi=yes`
    );

    const data = await response.json();

    if (!data.error) {
      setWeather(data);
    } else {
      alert("City not found");
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="weather-container">
      <div className="weather-card">
        <h1>Weather App</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={getWeather}>Search</button>
        </div>

{weather && (
  <div className="weather-info">
    <h2>{weather.location.name}</h2>

    <img
      src={weather.current.condition.icon}
      alt={weather.current.condition.text}
    />

    <h3>{weather.current.temp_c}°C</h3>
    <p>{weather.current.condition.text}</p>

    <div className="details">
      <div>
        <strong>Humidity</strong>
        <p ><FaDroplet size={20} /> {weather.current.humidity}%</p>
      </div>

      <div>
        <strong>Wind</strong>
        <p><FaWind size={20}/> {weather.current.wind_kph} km/h</p>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
}

export default App;