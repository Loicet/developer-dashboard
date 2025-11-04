import React, { useState, useEffect } from 'react';

function WeatherCard({ theme }) {
  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Using wttr.in for free weather data (no API key needed)
    // Default location: London (you can change this)
    fetch('https://wttr.in/London?format=j1')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="text-center text-red-500">
          <p className="text-lg font-semibold">Error: {error}</p>
          <p className="text-sm mt-2">Unable to fetch weather data</p>
        </div>
      </div>
    );
  }

  const current = weatherData.current_condition[0];
  const location = weatherData.nearest_area[0];

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} text-2xl font-bold`}>
          Current Weather
        </h2>
        <span className="text-4xl">
          {current.weatherDesc[0].value.includes('Sunny') || current.weatherDesc[0].value.includes('Clear') ? '☀️' :
           current.weatherDesc[0].value.includes('cloud') ? '☁️' :
           current.weatherDesc[0].value.includes('rain') ? '🌧️' : '🌤️'}
        </span>
      </div>
      
      <div className="text-center mb-6">
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-lg mb-2`}>
          {location.areaName[0].value}, {location.country[0].value}
        </p>
        <div className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} text-6xl font-bold mb-2`}>
          {current.temp_C}°C
        </div>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-xl`}>
          {current.weatherDesc[0].value}
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'} rounded-lg p-4`}>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm mb-1`}>
            Wind Speed
          </p>
          <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} text-xl font-semibold`}>
            {current.windspeedKmph} km/h
          </p>
        </div>
        
        <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'} rounded-lg p-4`}>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm mb-1`}>
            Humidity
          </p>
          <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} text-xl font-semibold`}>
            {current.humidity}%
          </p>
        </div>
      </div>
      
      <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'} rounded-lg p-4 text-center`}>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm mb-1`}>
          Current Time
        </p>
        <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} text-2xl font-mono font-bold`}>
          {formatTime(currentTime)}
        </p>
      </div>
    </div>
  );
}

export default WeatherCard;