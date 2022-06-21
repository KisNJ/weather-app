import "./App.css";
import WeatherPage from "./WeatherPage";
import OtherCitiesPage from "./OtherCitiesPage";
import { useState, useEffect } from "react";
import cloudGoogle from "./svg/cloud-google.svg";
import celcius from "./svg/celcius.svg"
import fahrenheit from "./svg/fahrenheit.svg"
import loading from "./svg/loading.svg"
function App() {
  //{weather:[{main:""}]}
  const [weatherData, setWeatherData] = useState("");
  const [inputValue,setInputValue]=useState("London")
  const [city, setCity] = useState("London");
  const [giveCityCode,setCityCode]=useState(["",""]);
  const [error, setError] = useState("");
  const [metric,setMetric]=useState(true)
  const [otherCities,setOtherCities]=useState([])
  const [buttonPressed,setButtonPressed]=useState(false)
  const [mainLatLon,setMainLatLon]=useState({lon:undefined,lat:undefined})
  //resp.weather[0].main
  useEffect(() => {
    fetchANewCity();
  }, []);
  async function fetchANewCity() {
    setWeatherData("");
    setCityCode(["",""])
    let lat, long;
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=0638f7d3edfaea9be1580346fabd219b`
      );
      if (!response.ok) {
        throw new Error("Wrong city name can't get the data");
      }
      let data = await response.json();
      setOtherCities([...data.splice(1)])
      lat = data[0].lat;
      long = data[0].lon;
      setError("");
    } catch (error) {
      setError("Wrong city name can't get the data");
    }
    
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=0638f7d3edfaea9be1580346fabd219b`
      );
      if (!response.ok) {
        throw new Error("Wrong city name can't get the data");
      }
      setMainLatLon({long,lat})
      let data = await response.json();
      
      //setOtherCities([...data.splice(1)])
      setCityCode([data.city.name,data.city.country])
      setWeatherData([
        data.list[0],
        data.list[8],
        data.list[16],
        data.list[24],
        data.list[32],
        data.list[39],
      ]);
      setError("");
    } catch (error) {
      
      setError("Wrong city name can't get the data");
    }
  }
  useEffect(()=>{
    let timer
    console.log(giveCityCode)
    if(giveCityCode[0]===""){
      timer=setInterval(()=>{
      console.log("5 sec")
      setError("Wrong city name can't get the data")
    },5000)}
    else{
      console.log("else")
      clearInterval(timer)
    }
    return ()=>clearInterval(timer)
  },[city,giveCityCode])
  async function search(lat,long){
    try{
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=0638f7d3edfaea9be1580346fabd219b`
      );
      if (!response.ok) {
        throw new Error("Wrong city name can't get the data");
      }
      let data = await response.json();
      setMainLatLon({long,lat})
      setCityCode([data.city.name,data.city.country])
      setWeatherData([
        data.list[0],
        data.list[8],
        data.list[16],
        data.list[24],
        data.list[32],
        data.list[39],
      ]);
      setError("");
    }catch(error){
      setError("Wrong city name can't get the data");
    }
  }
  function handleCityChange(e) {
    setInputValue(e.target.value)
    //setCity(e.target.value);
  }
  function changeTemp(){
    setMetric(old=>!old)
  }
  function handlePress(e){
    if(e.key === 'Enter') { 
      setButtonPressed(true)
      setCity(inputValue)
      
     }
  }
  useEffect(()=>{
    if(buttonPressed){
      fetchANewCity();
      setButtonPressed(false)
    }
  },[buttonPressed,city])
  function submit(e){
    e.preventDefault();
    setCity(inputValue)
    setButtonPressed(true)
  }
  return (
    <div className="App" onKeyDown={handlePress}>
      <header>
        <div><img className="creamSvg" id="cloudGoogle" src={cloudGoogle} alt="" />
        Weather App</div>
        <form onSubmit={submit}action="">
        <fieldset>
          <img onClick={changeTemp}className="creamSvg metric"src={metric?celcius:fahrenheit} alt="" />
          <input
            placeholder="Search a city"
            value={inputValue}
            onChange={handleCityChange}
            type="text"
            id="city"
            name="city"
          />
          <button>Search a new city</button>
        </fieldset>
        </form>
      </header>
      <main>
          {otherCities.length>0?<OtherCitiesPage cities={otherCities} search={search} mainName={city} cLat={mainLatLon.lat} cLon={mainLatLon.long}/>:""}
          {error!==""?<h1>Wrong city name can't get the data</h1>:weatherData === "" ? (
            <div className="loading-div">
              <img className='rotate'src={loading} alt="..." />
              <div>Loading</div>
            </div>
          ) : error === "" ? (
            <WeatherPage data={weatherData} city={giveCityCode[0]} code={giveCityCode[1]} temp={metric} />
          ) : (
            error
          )}
        
      </main>
    </div>
  );
}

export default App;
