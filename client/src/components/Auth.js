import React, { useState } from 'react';
import '../css/Auth.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, 
  Container, 
  Card, 
  Form,
  Alert
} from 'react-bootstrap';

function Auth() {

    const [auth, setAuth] = useState(false);
  
    let email = auth ? 
      <Form.Group>
        <Form.Label>Enter your email:</Form.Label>
        <Form.Control type = "email" />
      </Form.Group>
      : null;
  
  
    return (
      <div className="Auth">
          <Container style = {{minWidth: '350px', width: '40px'}}>
            <Card>
              <Card.Body>
                <Alert style = {{fontSize: '1em', padding: '5px 10px' }} variant = "danger">Wrong data</Alert>
                <Form>
                  <Form.Group>
                    <Form.Label>Enter your login:</Form.Label>
                    <Form.Control type = "text" />
                  </Form.Group>
                  
                  {email}
  
                  <Form.Group>
                    <Form.Label>Enter your password:</Form.Label>
                    <Form.Control type = "text" />
                  </Form.Group>
  
  
                  <Button 
                    variant = 'primary' 
                    size = 'lg'
                    onClick = { () => setAuth(!auth) } 
                    block>
                    Submit
                  </Button>
  
                </Form>    
              </Card.Body>      
            </Card>
          </Container>
      </div>
    );

}

  export default Auth;