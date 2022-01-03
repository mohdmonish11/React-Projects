import { Button} from '@material-ui/core';
import React from 'react'
import { useHistory } from 'react-router-dom';
import ViewImage from '../ViewImage/ViewImage';
import "./Result.css";

const Result = ({apidata}) => {

  console.log(apidata);
  const history = useHistory();
  
  const handleClick = ()=>{
    history.push("/");
  }

  return (
    <div>
      <div className="result_main">
        <Button variant="contained" color="secondary" onClick={handleClick}> Go Back</Button>
      </div><br />
      <div className="card">
        {apidata.map((data, i) =>{
          return <ViewImage
                key ={i}
                // publisher
                publisher ={(data.volumeInfo) ? data.volumeInfo.publisher : ''}
                image ={(data.volumeInfo.imageLinks) ? data.volumeInfo.imageLinks.thumbnail : ''}
                publishedDate= {data.volumeInfo.publishedDate}
                language={data.volumeInfo.language}
                previewLink={data.volumeInfo.previewLink}
                // image ={data.volumeInfo.imageLinks.thumbnail}
                title ={data.volumeInfo.title}
                author={data.volumeInfo.authors}
                pageCount ={data.volumeInfo.pageCount}
                description ={data.volumeInfo.description}
                />
        })}
      </div>
    </div>
  )
}

export default Result;
