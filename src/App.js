import React, { useState } from 'react';
import WeatherBox from './components/WeatherBox';

const api = {
  key: "97c493cec26c6261d87248df541c2958",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${month} ${date} ${year}`
  }

  const search = (evt) => {
    if (evt.key === 'Enter' && query.trim()) {
      const url = `${api.base}weather?q=${encodeURIComponent(query.trim())}&units=imperial&appid=${api.key}`;
      fetch(url)
        .then(res => res.json())
        .then(result => {
          if (result.cod === 200) {
            setWeather(result);
            setError(null);
            setQuery('');
          } else {
            setError(result.message || 'Location not found');
            setWeather(null);
          }
        })
        .catch(() => {
          setError('Failed to fetch weather');
          setWeather(null);
        });
    }
  }

  const isWarm = weather && weather.main && weather.main.temp > 65;

  return (
    <div className={"app" + (isWarm ? ' warm' : '')}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          />
          {error && <div className="search-error" style={{color: '#ffdddd', marginTop: 8}}>{error}</div>}
        </div>

        <div className="location-box">
          <div className="location">{weather ? `${weather.name}, ${weather.sys?.country}` : 'New York, US'}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>

        <WeatherBox
          temp={weather ? `${Math.round(weather.main.temp)}°F` : '75°F'}
          description={weather ? weather.weather[0].main : 'Sunny'}
        />
      </main>
    </div>
  );
}

export default App;
