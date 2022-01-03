import React from 'react';
import "./View.css";

const View = ({dewpoint, date, feels_like_m, humidity, moon_phase, moonrise, pressure,
             rain, max_temp, min_temp, wind_deg, wind_speed, description, icon}) => {

  const icons = `http://openweathermap.org/img/wn/${icon}.png`;
  const dat = new Date(date * 1000).toGMTString();
  const moonr = new Date(moonrise * 1000).toGMTString();

  return (
    <div className="sub-result-box">
      <h3>{dat}</h3>
      <h3 className="description">{description}</h3>
      <img src = {`${icons}`} className="weather-icon" alt="" />
      <h3>{(feels_like_m - 273.15).toFixed(2)}°C</h3>
      <p>Max: &nbsp;&nbsp;{(max_temp -273.15).toFixed(2)}&nbsp;°C | Min:&nbsp;&nbsp;{(min_temp - 273.15).toFixed(2)}&nbsp;°C </p>
      <p>Feels Like: &nbsp;&nbsp; {(feels_like_m -273.15).toFixed(2)}&nbsp;°C </p>
      <p>Wind Speed: &nbsp;&nbsp;{wind_speed}&nbsp;km/h &nbsp;| {wind_deg}&nbsp;°C</p>
      <p>Pressure: &nbsp;&nbsp;{pressure}&nbsp;mb</p>
      <p>Humidity: &nbsp;&nbsp;{humidity}&nbsp;%</p>
      <p>Rain:&nbsp;&nbsp;{rain}&nbsp;</p>
      <p>Dewpoint: &nbsp;&nbsp;{dewpoint}&nbsp;</p>
      <p>Moon Phase:&nbsp;&nbsp;{moon_phase}&nbsp;</p>
      <p>Moon Rise:&nbsp;&nbsp;{moonr}&nbsp;</p>
    </div>
  )
};

export default View;
