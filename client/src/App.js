import React, { useState } from 'react';
import Auth from './components/Auth';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, 
  Container, 
  Card, 
  Form,
  Alert
} from 'react-bootstrap';

function App() {

  const [auth, setAuth] = useState(false);

  let email = auth ? 
    <Form.Group>
      <Form.Label>Enter your email:</Form.Label>
      <Form.Control type = "email" />
    </Form.Group>
    : null;


  return (
    <div className="App">
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
