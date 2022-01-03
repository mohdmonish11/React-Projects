import React, { useState } from 'react';
import { useHistory } from 'react-router';
import {Button, FormControl, InputLabel, makeStyles, MenuItem, Select} from '@material-ui/core';
import "./Inputs.css";
import axios from 'axios';
import { BounceLoader } from 'react-spinners';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 250,
  }
}));

const Inputs = ({listType, setListType, setApidata, setError, setLoading, apidata}) => {

  const history = useHistory();
  const classes = useStyles();
  const [load, setLoad] = useState(false);

  
  const homeClick =()=>{
    setListType('');
    setError('');
    setApidata();
    setLoading(false);
    history.push("/");
  }
  
  const handleClick =()=>{
    if (listType === ''){
      history.push('/');
    } else if (listType === 'takerecipename'){
      setApidata();
      history.push("/menubyname");
    } else if (listType === 'category' || listType === 'area' ||listType === 'ingredient'){
      setApidata();
      history.push("/filterbyACI");
    } else if (listType === 'c' || listType === 'a' ||listType === 'i'){
      setApidata();
      const final_url = "mealapp.pl?list_type="+listType;
      setLoad(true);
      axios.get(final_url)
          .then( data =>{
            if(data.data.status === 0){
              setError(data.data.err_msg);
            } else if(data.data.meals === null){
              setError("INVALID ENTRY");
            } else{
              setApidata(data.data.meals);
            }
            setLoad(false);
          }).catch(err =>{
            console.log(err);
          });
      history.push("/listbyACI");
    } else{
      console.log(listType);
    }
  }
  
  return (
    <>
      <div style={{margin:"15px",padding:"5px"}}>
        <Button variant="contained" color="secondary" size="large" onClick={homeClick}>HOME</Button>
      </div>
      <div className="select">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>Menu Selector</InputLabel>
            <Select
              value={listType}
              onChange={(e)=>setListType(e.target.value)}
              label="Menu Selector"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"takerecipename"}>Menu by(First Letter/Name)</MenuItem>
              <MenuItem value={"c"}>List Category</MenuItem>
              <MenuItem value={"a"}>List Area</MenuItem>
              <MenuItem value={"i"}>List Ingredient</MenuItem>
              <MenuItem value={"category"}>Filter Menu by Category</MenuItem>
              <MenuItem value={"area"}>Filter Menu by Area</MenuItem>
              <MenuItem value={"ingredient"}>Filter Menu by Ingredient</MenuItem>
            </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary"  size="large" onClick={handleClick}>Submit</Button>
      </div>
      <div className="loader-s">
        <BounceLoader loading = {load} size={40} color='black' />
      </div>
      
    </>
  )
}

export default Inputs;
