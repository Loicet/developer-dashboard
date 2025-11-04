import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import GitHubCard from './components/GitHubCard';
import WeatherCard from './components/WeatherCard';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} transition-colors duration-300`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} text-3xl font-bold mb-2`}>
            Welcome Back! 👋
          </h2>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-lg`}>
            Here's your developer dashboard overview
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GitHubCard theme={theme} />
          <WeatherCard theme={theme} />
        </div>
      </main>
      
      <footer className={`${theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-600'} mt-12 py-6`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>Built with React & Tailwind CSS</p>
          <p className="text-sm mt-1">Developer Dashboard © 2024</p>
        </div>
      </footer>
    </div>
  );
}

export default App;