import React from 'react';
import { useHistory } from 'react-router-dom';
import "./Error.css";

const Error = ({error}) => {

  const history= useHistory();
  const redirect =()=>{
    history.push("/");
  }
  if (error){
    return (
      <div className="error">
        <h1> ::Error Occured:: </h1>
        <br/>
        <h4> {error}</h4>
      </div>
    )
  } else{
    return(
      <>
      {redirect()}
      </>
    )
  }
}

export default Error;
