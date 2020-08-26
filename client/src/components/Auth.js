import React, { useState, useEffect } from 'react';
import '../css/Auth.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button,
  Container,
  Card,
  Form,
  Alert,
  Image
} from 'react-bootstrap';

import { Link } from 'react-router-dom';


//This component is being used both for login and register
function Auth({ isLogin, tryLogIn }) {

  let initialErrorsState = {
    login: '',
    email: '',
    password: ''
  }

  // const [login, setLogin] = useState('');
  // const [password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  const [errors, setErrors] = useState(Object.assign({}, initialErrorsState));



  let email = !isLogin ?
    <Form.Group>
      <Form.Label>Enter your email:</Form.Label>
      <Form.Control type="email" placeholder="yourEmail@.com" id="email" name="email" onChange={inputChangeHandler} className={
        errors['email'] ? 'is-invalid' : ''
      } />
      <div className={
        errors['email'] ? 'error-msg' : 'hidden'
      }>{errors['email']}</div>
    </Form.Group>
    : null;

  useEffect(() => {
    console.log(`Auth rendered`);
  }, []);

  // useEffect(() => {
  //   console.log(`Auth updated`);
  // });

  return (

    <div className="d-flex justify-content-center">
      <Image className="backgroundImage" src="background.png" />
      <div className="Auth">
        <Container style={{ minWidth: '350px', width: '40px' }}>
          <Card>
            <Card.Body id="cardBody">
              {errorMsg && <Alert style={{ fontSize: '1em', padding: '5px 10px' }} variant="danger">{errorMsg}</Alert>}
              <Form>
                <Form.Group>
                  <Form.Label>Enter your login:</Form.Label>
                  <Form.Control type="text" placeholder="login" id="login" onChange={inputChangeHandler} name="login" maxLength='20' autoFocus className={
                    errors['login'] ? 'is-invalid' : ''
                  } />
                  <div className={
                    errors['login'] ? 'error-msg' : 'hidden'
                  }>
                    {errors['login']}
                  </div>
                </Form.Group>

                {email}

                <Form.Group>
                  <Form.Label>Enter your password:</Form.Label>
                  <Form.Control type="text" placeholder="password" id="password" name="password" onChange={inputChangeHandler} maxLength='16' className={
                    errors['password'] ? 'is-invalid' : ''
                  } />
                  <div className={
                    errors['password'] ? 'error-msg' : 'hidden'
                  }>
                    {errors['password']}
                  </div>
                </Form.Group>


                <Button
                  variant='primary'
                  size='lg'
                  onClick={Authenticate}
                  block>
                  Submit
                </Button>

                {isLogin &&
                  <Link to="register" id='registerLink' >
                    <div id="noAccountLabel" >
                      Don't have an account?
                  </div>
                  </Link>
                }

              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );

  function validateForm(name, value) {

    let formErrors = Object.assign({}, errors);


    switch (name) {
      case 'login':

        let loginExp = new RegExp('^[a-zA-Z0-9-_]+$');

        formErrors[name] = value.length < 4 ? 'At least 4 characters long!' : loginExp.test(value) ? '' : 'Invalid login';

        break;

      case 'email':

        let emailExp = new RegExp('^[a-zA-Z0-9-_]+@[a-zA-Z]+\\.[a-zA-Z]{2,3}$');

        formErrors[name] = !value.includes('@') ? 'Invalid email!' : emailExp.test(value) ? '' : 'Invalid email';

        break;

      case 'password':

        let passwordExp = new RegExp('^[a-zA-Z0-9-$&@_]+$');

        formErrors[name] = value.length < 4 ? 'At least 4 characters long' : passwordExp.test(value) ? '' : 'Invalid password';

        break;
      default:
        break;
    }

    setErrors(formErrors);

  }

  function inputChangeHandler(e) {
    const { name, value } = e.target;

    validateForm(name, value);
  }

  async function Authenticate() {

    let login = document.getElementById('login').value;
    let password = document.getElementById('password').value;

    let email = isLogin ? null : document.getElementById('email').value;

    //validating on submit (quite messy)===================
    if (errors.login || errors.password || errors.email) {
      return;
    }

    if (!login || !password) {
      return;
    }

    if (!isLogin) {
      if (!email)
        return;
    }

    //End Validation======================================

    let url = isLogin ? 'login' : 'register';

    const data = {
      login,
      password,
      email
    }

    console.log(data);

    let response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    let jsonData = await response.json();

    console.log(`${url} response:`);

    console.log(jsonData);

    if (jsonData.msg) {
      setErrorMsg(jsonData.msg);
    }

    //executing callback, passed through props by App to update authState
    tryLogIn(jsonData.isAuthenticated, jsonData.expiresIn, login);
  }



}

export default Auth;