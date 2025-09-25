import React from 'react';
import Weather from './Weather';

export default function WeatherBox({ temp, description }) {
  return (
    <div className="weather-box">
      <div className="weather-card">
        <div className="temp">{temp}</div>
        <Weather description={description} />
      </div>
    </div>
  );
}
