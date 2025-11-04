import React, { useState, useEffect } from 'react';

function GitHubCard({ theme }) {
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace 'octocat' with your GitHub username
    fetch('https://api.github.com/users/octocat')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub data');
        }
        return response.json();
      })
      .then(data => {
        setGithubData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

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
          <p className="text-sm mt-2">Please check your internet connection</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300`}>
      <div className="flex items-center mb-4">
        <h2 className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} text-2xl font-bold`}>
          GitHub Profile
        </h2>
      </div>
      
      <div className="flex flex-col items-center">
        <img
          src={githubData.avatar_url}
          alt="GitHub Avatar"
          className="w-32 h-32 rounded-full border-4 border-blue-500 mb-4"
        />
        <h3 className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} text-xl font-semibold mb-2`}>
          {githubData.name || githubData.login}
        </h3>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4`}>
          @{githubData.login}
        </p>
        
        <div className="grid grid-cols-3 gap-4 w-full mt-4">
          <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'} rounded-lg p-4 text-center`}>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
              Repositories
            </p>
            <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} text-2xl font-bold`}>
              {githubData.public_repos}
            </p>
          </div>
          
          <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'} rounded-lg p-4 text-center`}>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
              Followers
            </p>
            <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} text-2xl font-bold`}>
              {githubData.followers}
            </p>
          </div>
          
          <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'} rounded-lg p-4 text-center`}>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
              Following
            </p>
            <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} text-2xl font-bold`}>
              {githubData.following}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GitHubCard;