import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import React, { useState } from 'react';
import "./Input.css";
import axios from "axios";
import {BounceLoader} from 'react-spinners';
import isEmpty from 'lodash-es/isEmpty';
import Result from '../Result/Result';
import FormControl from '@material-ui/core/FormControl';
import { ACTIONS, INPUT_SET } from '../../Reducer';

const Input = ({dispatch, issue, username, repo, error,apidata}) => {
  const url = "React-task6/issue.pl?";
  const [loading, setLoading] = useState(false);

  const handleSubmit =(e)=>{
    dispatch({type: ACTIONS, payload:{error:'',apidata:[]}});
    e.preventDefault();
    setLoading(true);
    
    if (issue === '' || username === '' || repo === ''){
      dispatch({type:ACTIONS, payload:{error:"ENTER ALL DETAILS"}});
      setLoading(false);
    } else{
      dispatch({type:INPUT_SET, payload:{issue:'',username:'', repo:''}});
  
      let final_url = url+'owner='+username+'&repo='+repo+'&state='+issue;
     
      axios.get(final_url)
          .then(data =>{
              if(data.data.status === 404){
                dispatch({type:ACTIONS, payload:{error: data.data.error_msg}});
                // setError(data.data.error_msg);
              } else{
                dispatch({type:ACTIONS, payload:{apidata:data.data}});
                // setApidata(data.data);
              }
              setLoading(false);
              }).catch( err =>{
                console.log(err);
              });
    }
    
  }
  
  return (
    <div>
      <form>
        <div>
          <TextField label="Enter User Name" variant="outlined"
          value={username}  
          onChange={(e)=>dispatch({type:INPUT_SET, payload:{username:(e.target.value)}})} />
        </div>
        <div>
          <TextField label="Enter Repo Name" variant="outlined"
          value={repo}
          onChange={(e)=>dispatch({type:INPUT_SET, payload:{repo:(e.target.value)}})} />
        </div>
        <div>
          <FormControl variant="outlined">
            <Select
              value={issue}
              onChange={(e)=>dispatch({type:INPUT_SET, payload:{issue:(e.target.value)}})}
              displayEmpty
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value={"all"}>All-Issues</MenuItem>
              <MenuItem value={"open"}>Open Issues</MenuItem>
              <MenuItem value={"closed"}>Closed Issues</MenuItem>
            </Select>
          </FormControl>  
        </div>
        <div>
          <Button type="button" variant="contained"color="primary" size="large" onClick={handleSubmit}>Submit</Button>
        </div>
      </form>

      <div className="loader">
        <BounceLoader loading = {loading} size={35} color='black' />
      </div>
      <div>
        {error && <h4 className='error-display'><i>{error}</i></h4>}
      </div>
      <div>
        {!isEmpty(apidata) && <Result apidata={apidata} />}
      </div>
    </div>
  )
}

export default Input;
