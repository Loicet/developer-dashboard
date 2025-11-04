
import './App.css'
import GitHubCard from './components/GitHubCard'
import Navbar from './components/Navbar'
import WeatherCard from './components/WeatherCard'

function App() {
 
  return (
    <>
      <div className='p-0 m-0'>
        <Navbar/>
        <GitHubCard/>
        <WeatherCard/>
      </div>
    </>
  )
}

export default App
