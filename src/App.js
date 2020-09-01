import React, {useState} from 'react';
import './App.css';

const api={
  key: "adbd1c0234ee7ff53cd441fcd9d49ac5",
  base: "http://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery]=useState('');
  const [weather, setWeather]=useState('');

  const search=(e)=>{
    if(e.key==='Enter'){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(res=>res.json())
    .then(result=>{
      setWeather(result);
      setQuery('');
      })
    }
  }

  const dateBuilder=(e)=>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day=days[e.getDay()];
    let date=e.getDate();
    let month=months[e.getMonth()];
    let year=e.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  }

  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 26 ? "app warm" : "app")) : "app"}>
        <main>
          <div className="search-box">
            <input type="text" placeholder="Search.." className="search-bar"
            onChange={e=>setQuery(e.target.value)}
            value={query} onKeyPress={search}/>
          </div>

   {(typeof weather.main != 'undefined')?(
  <div>
      <div className="location-box">
        <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())} </div>
        </div>
      <div className="weather-box">
        <div className="temp">{Math.round(weather.main.temp)}°C</div>
            <div className="weather">{weather.weather[0].main}</div>
        </div>
      </div>)
          :('')}   
          </main>
    </div>
  );
}


export default App;
