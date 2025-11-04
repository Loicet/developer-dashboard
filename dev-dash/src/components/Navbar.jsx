import React from 'react';

function Navbar({ theme, toggleTheme }) {
  return (
    <nav className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-600'} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-white text-2xl font-bold">Dev Dashboard</h1>
          </div>
          <button
            onClick={toggleTheme}
            className={`${
              theme === 'dark' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'
            } px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105`}
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;