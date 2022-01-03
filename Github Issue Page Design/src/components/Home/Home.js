import React from 'react';
import {Button} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { ACTIONS, INPUT_SET } from '../../Reducer';



const Home = ({dispatch}) => {

  const history = useHistory();

  const homeClick=()=>{
    history.push("/");
    dispatch({type:INPUT_SET,payload:{issue:'',repo:'',username:''}});
    dispatch({type:ACTIONS, payload:{error:'', apidata:[]}});
  }
  return (
    <div style={{margin:"15px",padding:"5px"}}>
      <Button variant="contained" color="secondary" size="small" onClick={homeClick}>HOME</Button>
    </div>
  
  )
}

export default Home
