import React, { useState } from 'react';
import Auth from './components/Auth';
import Header from './components/Header';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className="App">
      <Header />
      <Auth />
    </div>
  );

  async function clickHandler()
  {
      let response = await fetch('api/test');
      console.log(await response.json());
  }
}

export default App;