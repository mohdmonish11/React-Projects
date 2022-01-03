import React, { useReducer } from 'react';
import {Button, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import "./PlayQuiz.css";
import qBank from '../Question/Question';
import { useHistory } from 'react-router-dom';

const initialState = {value:'' ,disabled:true, message:'',number: 0, checkanswerdisable: false};

function reducer(state, action) {
  switch (action.type) {
    case 'value':
      return {...state, value: action.value};
    case 'buttonClick':
      return {
        ...state, 
        disabled: action.payload.disabled, 
        checkanswerdisable: action.payload.checkanswerdisable,
      };
    case 'message':
      return {...state, message: action.payload};
    case 'NEXT': 
      return {
      value: '',
      disabled: true,
      message: '',
      checkanswerdisable: false,
      number: state.number+1
      };
    default:
      throw new Error();
  }
}

const PlayQuiz = ({score, setScore}) => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  const {number, value, message,disabled, checkanswerdisable} = state;


  if (number === 5){
    history.push("/result");
  }
  
  const checkAnswer =() =>{
    let message = '';
    if (qBank[number].correct === value){
      setScore(score +1);
      message = value + 'is correct';
      dispatch({type:'buttonClick', payload:{disabled: false, checkanswerdisable:true}})
    
    } else if ((value) === ''){
      message = 'Please Select an option';
    
    } else if (qBank[number].correct !== value){
      setScore(score);
      message = value + 'is wrong';
      dispatch({type:'buttonClick', payload:{disabled: false, checkanswerdisable:true}})
    }
    dispatch({type:'message', payload: message});
}
  
  return (
    <div>
      <div className="options">
          <div>
            <h2>  
            {qBank[number].question}
            </h2><br />
              <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={(e) => dispatch({type: "value",value: e.target.value})}>
                <FormControlLabel value={qBank[number].answers[0]} control={<Radio />} label={qBank[number].answers[0]} />
                <FormControlLabel value={qBank[number].answers[1]} control={<Radio />} label={qBank[number].answers[1]} />
                <FormControlLabel value={qBank[number].answers[2]} control={<Radio />} label={qBank[number].answers[2]} />
                <FormControlLabel value={qBank[number].answers[3]} control={<Radio />} label={qBank[number].answers[3]} />
              </RadioGroup>
            <span>{message}</span>
          </div>
      </div><br/>
      <Button type="submit" variant="outlined" color="primary" onClick ={checkAnswer} disabled={checkanswerdisable}>
        Check Answer
      </Button>
      <Button type ="submit" variant="outlined" size="large" color="secondary" disabled={disabled} onClick= {(e) => dispatch({type: 'NEXT'})}>
        Next
      </Button>
    </div>
  )
}

export default PlayQuiz;
