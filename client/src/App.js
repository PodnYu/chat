import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

function App() {
  return (
    <div className="App">
        <button className="btn btn-success" onClick = {clickHandler}>
            Notification
        </button>
    </div>
  );

  async function clickHandler()
  {
      let response = await fetch('api/test');
      console.log(await response.json());
  }
}



export default App;
