import React, { useState } from 'react'
import {Button, TextField} from '@material-ui/core';
import "./Search.css";
import axios from 'axios';
import {useHistory} from 'react-router-dom';


export const Search = ({apidata, setApidata}) => {

  const [value, setValue] = useState();
  const history = useHistory();


  const handleSubmit =async(e) =>{
    e.preventDefault();
    const {data} = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${value}`)
    setApidata(data.items);
    history.push("/result");

  };

  return (
      <div>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <TextField 
          label="Search Books" 
          variant="outlined"
          color="secondary"
          required 
          size="small" onChange={(e)=>setValue(e.target.value)}/>
          <Button type="submit" variant="contained"color="primary" size="large">Search</Button>
        </form>
        
      </div>  
  )
};
