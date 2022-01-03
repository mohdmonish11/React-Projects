import React, { useState } from 'react';
import { Route, Switch} from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import "./App.css";
import NameInput from './component/MenuByName/NameInput';
import Inputs from './component/Inputs/Inputs';
import Filter from './component/FilterByACI/Filter';
import ListRecipe from './component/ListByACI/ListRecipe';

const MealdbApp = () => {
  
  const [listType, setListType] = useState('');
  const [error, setError] = useState('');
  const [apidata, setApidata] = useState();
  const [loading, setLoading] = useState(false);
  return (
    <>
      <BrowserRouter>
        <header className="header">Meals Menu</header>
        <Inputs listType={listType} setListType={setListType} setApidata={setApidata} error={error}
        setError={setError} setLoading={setLoading} loading={loading}/>
        <Switch>
          <Route path="/menubyname" exact>
            <NameInput error={error} setLoading={setLoading} loading={loading}
            setError={setError} apidata={apidata} setApidata={setApidata} />
          </Route>
          <Route path="/filterbyACI" exact>
            <Filter listType={listType} apidata={apidata} setApidata={setApidata}
            setError={setError} error={error} loading={loading} setLoading={setLoading}/>
          </Route>
          <Route path= "/listbyACI" exact >
            <ListRecipe apidata={apidata} listType={listType}/>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default MealdbApp;
