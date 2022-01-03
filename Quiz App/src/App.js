import React, { useState } from 'react';
import Header from './component/Header/Header';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import "./App.css";
import PlayQuiz from './component/PlayQuiz/PlayQuiz';
import Result from './component/Result/Result';


function App (){

  const [score, setScore] = useState(0);
  

  return (
    <BrowserRouter>
      <div className="main">
        <Header /> 
        <Switch>
          <Route path="/playquiz" exact>
            <PlayQuiz 
            score={score} 
            setScore={setScore}
            />
          </Route>
          <Route path="/result" exact>
            <Result score={score} setScore={setScore}/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
