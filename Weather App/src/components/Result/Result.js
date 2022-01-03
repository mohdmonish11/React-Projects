import { Button } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import "./Result.css";

const Result = ({apidata, setForecastData}) => {

  const history = useHistory();
  const redirect =()=>{
    history.push("/");
  }
  if (apidata){
    const forecastClick =async(e)=>{
      e.preventDefault();
      const lat = apidata.coord.lat;
      const lon = apidata.coord.lon;
      const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,current,alerts&appid=551528a9da7e49d19c9296b2b33f891a`);
      setForecastData(data);
      history.push("/forecast");
    }
  
    return (
      <>
      <div className="result-box">
        <h1>{apidata.name}, {apidata.sys.country}</h1>
        <h3 className="description">{apidata.weather[0].description}</h3>
        {/* <img src = {`${icon}`} className="weather-icon" alt="" /> */}
        <img src = {`http://openweathermap.org/img/wn/${apidata.weather[0].icon}.png`} className="weather-icon" alt="" />
        <h3>{(apidata.main.temp - 273.15).toFixed(2)}°C</h3>
        <p>Max: &nbsp;&nbsp;{(apidata.main.temp_max -273.15).toFixed(2)}&nbsp;°C | Min:&nbsp;&nbsp;{(apidata.main.temp_min - 273.15).toFixed(2)}&nbsp;°C </p>
        <p>Feels Like: &nbsp;&nbsp; {(apidata.main.feels_like -273.15).toFixed(2)}&nbsp;°C </p>
        <p>Wind Speed: &nbsp;&nbsp;{apidata.wind.speed}&nbsp;km/h</p>
        <p>Pressure: &nbsp;&nbsp;{apidata.main.pressure}&nbsp;mb</p>
        <p>Humidity: &nbsp;&nbsp;{apidata.main.humidity}&nbsp;%</p>
      </div>
      <div className="forecast">
      <Button variant="contained" color="primary" size="large" onClick={forecastClick}>Further Forcast</Button>
    </div>
    </>
    )
  } else{
      return(
        <>
        {redirect()}
        </>
    )
  }
}

export default Result;
