import React, { useState } from 'react';
import "./Header.css";
import {Button} from '@material-ui/core';
import {useHistory} from 'react-router-dom';


const Header = () => {

  const [hide, setHide] = useState(false);
  const history = useHistory();

  const handleClick=()=>{
    history.push("/playquiz");
    setHide(true);
  }

  return (
    <div className="title">
      <i className="fas fa-question-circle fa-3x"></i>
      <span>QuizApp</span>
      <div>
        <Button variant="contained" color="primary" size="large" onClick={handleClick} disabled={hide}>
          PlayQuiz
        </Button>
      </div>
    </div>
  );
};

export default Header;
