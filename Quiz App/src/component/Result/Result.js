import React from "react";
import {Button} from '@material-ui/core';
import { useHistory } from "react-router";


const Result = ({score, setScore}) => {

  const history = useHistory();

  const playAgain = () =>{
    history.push("/playquiz");
    setScore(0);
  }

  return (
  <div className="score-board">
    <div className="score">You scored {score}/ 5 correct answers!</div>

    <Button variant="outlined" size="large" color="secondary" onClick={playAgain}>
      PlayAgain
    </Button>
  </div>
  );
};

export default Result;