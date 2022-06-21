export default function ForecastCard({ forecastData,temp }) {
  let symbol=temp?"°C":"°F"
  let src=`http://openweathermap.org/img/wn/${forecastData.weather[0].icon}@2x.png`
  let date=new Date(forecastData.dt_txt.split(" ")[0].split("-")[0],forecastData.dt_txt.split(" ")[0].split("-")[1],forecastData.dt_txt.split(" ")[0].split("-")[2])
  function convert(temperatureInKelvin){
    let temperatureInKelvin2=parseInt(temperatureInKelvin)
    
    if(temp){
      return temperatureInKelvin2-273
    }else{
      return (temperatureInKelvin2-273)*9/5+32
    }
  }
  const weekday = ["Friday","Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Wednesday","Thursday"];
  return (
    <div className="forecast">
      <div className="bold title">{forecastData.dt_txt.split(" ")[0].split("-")[1]}.{forecastData.dt_txt.split(" ")[0].split("-")[2]} {weekday[date.getDay()]}</div>
      <div className="weather-description">
        <div className="bold">{forecastData.weather[0].main}</div>
        <img className={src==="http://openweathermap.org/img/wn/03d@2x.png"||"http://openweathermap.org/img/wn/03n@2x.png"?"darken":""}src={src} alt="img" />
      </div>
      <div className="item">
          <div>Temperature:</div>
          <div>{convert(forecastData.main.temp)} {symbol}</div>
        </div>
        <div className="item">
          <div>Maximum:</div> <div>{convert(forecastData.main.temp_max)} {symbol}</div>
        </div>
        <div className="item">
          <div>Minimum:</div> <div>{convert(forecastData.main.temp_min)} {symbol}</div>
        </div>
    </div>
  );
}
