import React, { useState } from 'react';
import {Button, TextField} from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import "./Input.css";

const Input = ({apidata, setApidata, setError}) => {

  const history = useHistory();
  const [cityname, setCityName] = useState('');
  

  const handleSubmit =async(e)=>{
    e.preventDefault();
    if (cityname === ''){
      setError("Please Enter the city Name");
      history.push("/error");
    } else{
      setCityName('');
      axios.defaults.baseURL ="https://api.openweathermap.org/data/2.5/";
      // const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=551528a9da7e49d19c9296b2b33f891a`);
      // setApidata(data);
      // history.push("/result");
      
      axios.get(`weather?q=${cityname}&appid=551528a9da7e49d19c9296b2b33f891a`)
      .then(data =>{
            setApidata(data.data);
            history.push("/result");
          }).catch( err =>{
            setError("No data for this city name");
            history.push("/error");
          });    
    }
  }
  

  const homeClick=()=>{
    history.push("/");
  }
  
  return (
    <>
    <div className="home">
      <Button variant="contained" color="secondary" size="small" onClick={homeClick}>Home</Button>
    </div>
    <div>
      <form onSubmit={handleSubmit} noValidate autoComplete="off" className="form">
        <TextField 
        label="City Name" 
        variant="outlined"
        color="secondary"
        required
        value={cityname}
        size="small" onChange={(e)=>setCityName(e.target.value)}/>
        <Button type="submit" variant="contained" 
         color="primary" size="large">Submit</Button>
      </form>
    </div>
    </>
  )
}

export default Input;
