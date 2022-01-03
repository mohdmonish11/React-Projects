import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { BounceLoader } from 'react-spinners';
import "./Filter.css";
import { isEmpty } from 'lodash';
import Result from '../Result/Result';

const Filter = ({listType, setError, apidata, setApidata, error, loading, setLoading}) => {

  const [filter, setFilter] = useState('');

  const handleClick = ()=>{
    setError('');
    let final_url = 'mealapp.pl?list_type='+listType+'&filter_word='+filter;
    // console.log(final_url);
    setLoading(true);
    axios.get(final_url)
              .then(data =>{
                  // console.log(data);
                  if (data.data.status === 0){
                    setError(data.data.err_msg);
                    setApidata();
                  } else if(data.data.meals === null){
                    setError("INVALID ENTRY");
                    setApidata();
                  } else{
                    setApidata(data.data.meals);
                  }
                  setLoading(false);
              }).catch(err =>{
                console.log(err);
              });
    setFilter('');
  }

  return (
    <>
      <div className="filter-input">
        <TextField label="Filter Word" variant="outlined" size="small" value={filter}
        onChange={(e)=>setFilter(e.target.value)}/>
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

export default Filter;
