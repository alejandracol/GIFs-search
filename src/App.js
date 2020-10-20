import React from 'react'
import { Switch, Route, Redirect } from 'wouter'
import GifsNavBar from './components/GifsNavBar'
import GifsSearch from './components/GifsSearch'
import GifsSelection from './components/GifsSelection'


export default function App() {
 
  return (
    <div className="d-flex justify-content-center">
      <GifsNavBar /> 
      <Switch>
        <Route component={GifsSearch} path="/search/:keyword"/>
        <Route component={GifsSelection} path="/gifs/:keyword" />
        <Redirect from="/" to="/search/trending" /> 
      </Switch> 
    </div>
  );
}


