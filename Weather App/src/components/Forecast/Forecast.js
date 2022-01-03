import React from 'react';
import View from '../View layout/View';
import "./Forecast.css";

const Forecast = ({forecastData}) => {

  if (forecastData){
    return (
      <div className="main-box">
        <div className="forecast-heading">
          <p>Forecast || TimeZone: {forecastData.timezone}</p>
        </div>
        <div className= "box">
            {forecastData.daily.map((data,i) =>{
              return <View
                  key ={i}
                  dewpoint= {data.dew_point}
                  date = {data.dt}
                  feels_like_m = {data.feels_like.day}
                  humidity = {data.humidity}
                  moon_phase = {data.moon_phase}
                  moonrise = {data.moonrise}
                  pressure = {data.pressure}
                  rain = {data.rain}
                  max_temp = {data.temp.max}
                  min_temp = {data.temp.min}
                  wind_deg = {data.wind_deg}
                  wind_speed = {data.wind_speed}
                  description ={data.weather[0].description}
                  icon ={(data.weather[0]) ? data.weather[0].icon : ''}
                />
              })}
        </div>
      </div>
    )
  } else{
      return(
          <>
          </>
      )
  }
}

export default Forecast;
