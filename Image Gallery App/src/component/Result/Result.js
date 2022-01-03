import { isEmpty } from 'lodash';
import React from 'react';
import "./Result.css";

const Result = ({apidata}) => {
  return (
    <div className="boxes">
      {!isEmpty(apidata) && apidata.map(data => {
        const {id} = data;
        return(
          <img key={id} src={data.urls.regular} alt='img' height="300" width="300"/>
        )
      })}
    </div>
  )
}

export default Result;
