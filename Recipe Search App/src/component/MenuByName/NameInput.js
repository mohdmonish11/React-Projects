import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import "./NameInput.css";
import {BounceLoader} from 'react-spinners';
import { isEmpty } from 'lodash';
import Result from '../Result/Result';

const NameInput = ({error, setError, apidata, setApidata, loading, setLoading}) => {
  
  const [recipeinput, setRecipeInput] = useState('');

  const handleClick =(e)=>{
    setRecipeInput('');
    e.preventDefault();
    setError('');
    if (recipeinput){
      setLoading(true);
      let final_url = 'mealapp.pl?recipe_name='+recipeinput;

      axios.get(final_url)
                .then(data =>{
                    if (data.data.status === 0){
                      setApidata();
                      setError(data.data.err_msg);
                    } else{
                      setApidata(data.data.meals);
                    }
                    setLoading(false);
                }).catch(err =>{
                  setApidata();
                  console.log(err);
                });
    } else{
      setError("PLEASE ENTER THE RECIPE NAME/ FIRST LETTER");
    }
  }
  return (
    <>
      <div className="recipe-input">
        <TextField label="First Letter/Recipe Name" variant="outlined" size="small"
        value={recipeinput}
        onChange={(e)=>setRecipeInput(e.target.value)}/>
        <Button type="submit" variant="contained" color="primary" onClick={handleClick}>Submit</Button>
      </div>
      <div className="loader">
        <BounceLoader loading = {loading} size={40} color='black' />
      </div>
      <div>
        {error && <h4 className='error-display'><i>{error}</i></h4>}
      </div>
      <div>
        {!isEmpty(apidata) && <Result apidata={apidata} />}
      </div>
    </>
  )
}

export default NameInput;
