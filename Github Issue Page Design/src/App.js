import React, { useReducer } from 'react';
// import React, {useReducer} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import "./App.css";
import Home from './components/Home/Home';
import Input from './components/Input/Input';
import { ACTIONS, INPUT_SET } from './Reducer';

const initialState = {issue:'',username:'',repo:'',apidata:[],error:''};

function reducer (state,{type,payload}){
  switch(type){
    case INPUT_SET:
      return{
        ...state,
        ...payload
      };
    case ACTIONS:
      return{
        ...state,
        ...payload
      };
    default:
      return state;

  }
}

const GithubIssue = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const {issue,username,repo,apidata,error} = state;

  return (
    <BrowserRouter>
      <>
        <div>
          <header className="header">Github Issue</header>
          <hr/>
        </div>
        <Switch>
          <Route path="/" exact>
            <Home 
            dispatch={dispatch}/>
            <Input issue={issue} username={username} repo={repo} apidata={apidata} error={error}
            dispatch={dispatch}/>
            {/* <Input issue={issue} setIssue={setIssue} 
                  username={username} setUserName ={setUserName}
                  repo={repo} setRepo={setRepo} 
                  setApidata={setApidata} apidata={apidata}
                  error={error} setError={setError} /> */}
          </Route>
        </Switch>
      </>
    </BrowserRouter>
  )
}

export default GithubIssue;
