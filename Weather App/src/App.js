import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import "./App.css";
import Error from './components/Error/Error';
import Forecast from './components/Forecast/Forecast';
import Input from './components/input/Input';
import Result from './components/Result/Result';

const WeatherApp = () => {
  
  const [apidata, setApidata] = useState();
  const [forecastData, setForecastData] = useState();
  const [error, setError] = useState('');

  return (
    <>
      <div>
        <h1 className="header">WeatherApp</h1>
        <hr className="header-line"/>
      </div>
      <div className="components">
        <BrowserRouter> 
          <Input apidata={apidata} setApidata={setApidata} error={error} setError={setError} 
          />
          <Switch>
            <Route path="/result" exact>
              <Result apidata={apidata} setForecastData={setForecastData}/>
            </Route>
            <Route path="/error" exact>
              <Error error={error}/>
            </Route>
            <Route path="/forecast" exact>
              <Result apidata={apidata} setForecastData={setForecastData}/>
              <Forecast forecastData={forecastData}/>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </>
  )
}

export default WeatherApp;
