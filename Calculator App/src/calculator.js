import React, {useState} from 'react';
import './calculator.css';
const Calculator =()=>{
  const[result, setResult] = useState(""); 
  //useState is a Hook that lets you add React state to function components
  //useState is a Hook that lets you add React state to function components
  // UseState:- helps to use data dynamically. //count the occurance
  //[result, setResult] = useState(). This is similar to this.state.result and this.setResult.

  // I use the composing functionality of functions.
  const handleClick =(e)=>{
      setResult(result.concat(e.target.name)); // concatination of string based button clicked.
  }
  const clear =()=>{
      setResult("");  // making the string empty
  }
  const backSpace =()=>{
      setResult(result.slice(0, result.length -1)); // slice (0,-1)
  }
  const calculate =()=>{
      // try and catch block is used for error handling. 
      try{
          setResult(eval(result).toString()); // eval is inbuilt function for evaluate
      }
      catch(err){
          setResult("Error");
     }
  }
  return(
          <div className="container">
              <form>
                  <input type="text" value={result} /><br/>
              </form>
              <div className="keypad">
                  <button onClick={clear} id="clear" >Clear</button>
                  <button onClick={backSpace} id="backspace">C</button>
                  <button name="/" onClick={handleClick}>&divide;</button>
                  <button name="9" onClick={handleClick}>9</button>
                  <button name="8" onClick={handleClick}>8</button>
                  <button name="7" onClick={handleClick}>7</button> 
                  <button name="*" onClick={handleClick}>&times;</button>
                  <button name="6" onClick={handleClick}>6</button>
                  <button name="5" onClick={handleClick}>5</button>
                  <button name="4" onClick={handleClick}>4</button>
                  <button name="-" onClick={handleClick}>&ndash;</button>
                  <button name="3" onClick={handleClick}>3</button>
                  <button name="2" onClick={handleClick}>2</button>
                  <button name="1" onClick={handleClick}>1</button>
                  <button name="+" onClick={handleClick}>+</button>
                  <button name="0" onClick={handleClick}>0</button>
                  <button name="." onClick={handleClick}>.</button>
                  <button onClick={calculate} id="result">=</button>
              </div>
          </div>
    );
}


export default Calculator;
