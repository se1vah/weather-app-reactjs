import { useState } from 'react';
import './App.css';


function App() {
  const [img, setImg] = useState("https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png");
  const [city, setCity] = useState("");

  const [cityText, setCityText] =useState("Madurai");
  const [status, setStatus] = useState("Cloud")
  const [celcious, setCelcious] = useState("108");
  const [country, setCountry] = useState("IN");
  const [lat, setLat] = useState("12.4216");
  const [long,setLong] = useState("46.989");
  const [humidity, setHumidity] =useState("41");
  const [windSpeed, setWindSpeed] = useState("5.2");
  const [loading, setLoading] = useState(false);


  async function collectWeatherData(){
    setLoading(true);
    setCityText("");
    setCelcious("");
    setCountry("");
    setLat("");
    setLong("");
    setHumidity("");
    setWindSpeed("");
    setImg("");
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=15e5b38fed20297396a100bed349f58e&unit=Metric`;
    try{
      const all_data = await fetch(url)
      const json_data = await all_data.json();
      if(all_data.cod!="404")
        {
          setImg("https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png");
          setCelcious(Math.floor(json_data.main.temp));
          setCountry(json_data.sys.country);
          setLat(json_data.coord.lat);
          setLong(json_data.coord.lon);
          setHumidity(json_data.main.humidity);
          setWindSpeed(json_data.wind.speed);
          setCityText(json_data.name)
        }
        else
        {
          setCityText("City not available")
          setImg("");
        }
      }
      catch(error)
      {
        setCityText("City not available")
        setImg("");
    }
    finally
    {
      setLoading(false);
    }
  }

  return (
    <div className="App">

     <div className='search-box'>
      <input type='text' value={city} onChange={(e)=>{setCity(e.target.value)}} placeholder='City Name' onKeyDown={(e)=>{if(e.key === 'Enter'){collectWeatherData()}}} />
      <img className='search-icon' onClick={collectWeatherData} src="https://static-00.iconduck.com/assets.00/search-icon-2048x2048-cmujl7en.png" alt = "Search"/>
     </div>

        {loading && <p>Please wait!!!</p>}
        
        <div className='inner-information'>
          <div className='cc-class'>
            {!loading &&<h1 className='cityname'>{cityText}</h1>}
            <h3 className='countryname'>{country}</h3>
          </div>
          <div>
            {img && <img className='weather-image' src={img} alt="" />}
          </div>
        </div>
        {img && 
          <div>
          
          <div className='celcious-status'>
            <p className='celcious'>{celcious}°</p>
            <h3 className='status'>{status}</h3>
          </div>

          <div className='information'>
            <div>
              <label>Latitude</label>
              <p><b>{lat}</b></p>
            </div>
            <div>
              <label>Longitute</label>
              <p><b>{long}</b></p>
            </div>
            <div>
              <label>Humiditity</label>
              <p><b>{humidity}%</b></p>
            </div>
            <div>
              <label>Wind speed</label>
              <p><b>{windSpeed} Km/h</b></p>
            </div>
          </div>

          </div>
          }
    </div>
  );
}

export default App;
