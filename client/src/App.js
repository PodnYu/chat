import React, { useState } from 'react';
import Auth from './components/Auth';
import Header from './components/Header';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [auth, setAuth] = useState(false);

  console.log('rendered');

  return (
    <div className="App">
      <Router>

        <Route to = "/">
          <Header auth = {auth} />
        </Route>

        <Route path = "/login">
          <Auth />
        </Route>

        <Route path = "/register">
          <Auth />
        </Route>

      </Router>
    </div>
  );

  async function clickHandler()
  {
      let response = await fetch('api/test');
      console.log(await response.json());
  }
}

export default App;