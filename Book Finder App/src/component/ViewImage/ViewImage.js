import { Modal, makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import "./ViewImage.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    alignItems:'center',
    margin: '20px',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ViewImage = ({image,title,author,pageCount,description,publishedDate,language,previewLink, publisher}) => {

  // const [modal, setModal] = useState("hidden");
  const [modal, setModal] = useState(false);
  const classes = useStyles();
  const body = (
    <div className={classes.paper}>
      <p id="simple-modal-description">
        {description}
      </p>
    </div>
  );

  return (
    <div className="card-container">
      <img src = {`${image}`} alt= " not visible" />
      <div className="desc">
        <h2>Title: {title}</h2>
        <h3>Auhtor: {author}</h3>
        <p>PageCount: {pageCount}</p>
        <p>Published Date: {publishedDate}</p>
        <p>Language: {language}</p>
        <p>Publisher: {publisher}</p>
        <a href={previewLink} target='_blank' rel='noreferrer'>Preview Link</a><br/>
        <button onClick={()=>setModal(true)}>Description</button>
        <Modal open={modal} onClose={()=> setModal(false)}>
          {/* <p>{description}</p> */}
          {body}
        </Modal>
        {/* <button onClick={()=> setModal("visible")}>Description</button>
        <div style={{visibility:modal}}>
          <p>{description}</p>
        </div> */}
      </div>
    </div>
  )
}

export default ViewImage;
