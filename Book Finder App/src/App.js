import React, { useState } from 'react';
import { Header } from './component/Header/Header'
import { Search } from './component/Search/Search';
import "./App.css";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Result from './component/Result/Result';

export const BookFinderApp = () => {
  
  const [apidata, setApidata] = useState();

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Search apidata={apidata} setApidata={setApidata}/>
        <Switch>
          <Route path="/result" exact>
            <Result apidata={apidata}/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}


