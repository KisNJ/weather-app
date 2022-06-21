import React from "react";
import ForecastCard from "./Forecast";
import clearImg from "./svg/clear.png"
export default function WeatherPage({ data, city, code,temp }) {
  let forecast = [...data.slice(1)];
  let displayForeCast = forecast.map((x) => <ForecastCard forecastData={x} temp={temp}/>);
  let today = data[0];
  let symbol=temp?"°C":"°F"
  let src=`http://openweathermap.org/img/wn/${today.weather[0].icon}@2x.png`

  function convert(temperatureInKelvin){
    let temperatureInKelvin2=parseInt(temperatureInKelvin)
    
    if(temp){
      return temperatureInKelvin2-273
    }else{
      return (temperatureInKelvin2-273)*9/5+32
    }
  }
      return (
        <>
      <div id="today-card">
        <div className="card-title title">
          <div className="city">
            {city} ({code})
          </div>
          <div style={{ fontSize: "45px" }}>{today.dt_txt.split(" ")[0].split("-")[1]}.{today.dt_txt.split(" ")[0].split("-")[2]}</div>
        </div>
        <div className="weather-description">
          <div className="bold">{today.weather[0].main}</div>
          <div className="img-and-desc">
          <div>
           
          <img className={src==="http://openweathermap.org/img/wn/03d@2x.png"||"http://openweathermap.org/img/wn/03n@2x.png"?"darken":""}src={src} alt="img" /></div>
          </div>
          
        </div>
        <div className="item">
          <div>Temperature:</div>
          <div>{convert(today.main.temp)} {symbol}</div>{" "}
        </div>
        <div className="item">
          <div>Maximum:</div> <div>{convert(today.main.temp_max)} {symbol}</div>
        </div>
        <div className="item">
          <div>Minimum:</div> <div>{convert(today.main.temp_min)} {symbol}</div>
        </div>
      </div>
      <div id="forecast">{displayForeCast}</div>
    </>
  );
}
