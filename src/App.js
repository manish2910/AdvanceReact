import React from 'react';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom'
import LocationState from './context/locationState';
import AddLocation from './components/AddLocation/AddLocation';
import LocationList from './components/LocationList/LocationList';
import './App.css';

const App = () => {
  return (
    <LocationState>
      <Router>
        <Header>
          <Switch>
            <Route exact path="/add" component={AddLocation}/>
            <Route exact path="/" component={LocationList}/>
          </Switch>
        </Header>
      </Router>
    </LocationState>
  );
}

export default App;
