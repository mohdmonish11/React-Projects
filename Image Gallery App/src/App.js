import React, { useState } from 'react';
import {Button, TextField} from '@material-ui/core';
import {BounceLoader} from 'react-spinners';
import "./App.css";
import axios from 'axios';
import isEmpty from 'lodash-es/isEmpty';
import Result from './component/Result/Result';

const ImageFetcher = () => {

  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [apidata, setApidata] = useState();
  const url = "Image-App/fetch_image.pl?";

  const handleSubmit =(e)=>{
    e.preventDefault();
    setError('');
    setApidata('');
    setLoading(true);
    if (keyword === ''){
      setError("Enter Search Word");
      setLoading(false);
    } else{
      setKeyword('');
      axios.get(url+'keyword='+keyword)
        .then(data =>{
          console.log(data);
          if(data.data.status === 404){
            setError(data.data.error_msg);
          } else if (isEmpty (data.data.results)){
            setError("NO DATA FOUND FOR SUCH ENTRY");
          } else{
            setApidata(data.data.results);
          }
          setLoading(false);
          }).catch( err =>{
            console.log(err);
          });

    }

  }
  return (
    <>
      <header className="header">Image Fetcher</header>
      <div className="form">
        <form>
          <TextField label="Keyword Search" variant="outlined" value={keyword}  
          onChange={(e)=>setKeyword(e.target.value)}/>
          <Button type="submit" variant="contained" size="large" color="primary"
          onClick={handleSubmit}>Submit</Button>
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
    </>
  )
}

export default ImageFetcher;
