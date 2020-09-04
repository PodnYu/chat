import React, { useState, useEffect } from "react";
import Auth from "./components/Auth";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import ChatList from './components/ChatList';
import Chat from './components/Chat';
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  const [auth, setAuth] = useState(false);

  const [userName, setUserName] = useState('');

  const [encryptionKey, setEncryptionKey] = useState('');

  //checking basicly in componentDidMount whether user is authenticated
  //On every app refresh it will request the server and ask whether the user is authenticated
  //ProtectedRoute checks auth
  //So when refresh occurs, app sends request, on the same time protectedRoutes check auth
  //by default it is 'false' so refreshing protected route user will be redirected to /login
  //By that time the server will respond.
  //If user isn't authenticated it will stay on /login else he/she will be redirected to /home
  useEffect(() => {
    isAuthenticated()
      .then(data => {
        setAuth(data.isAuthenticated);
        setUserName(data.login);
        console.log('Fetched data', data);
      });
  }, []);

  const content = (
    <Router>

      <Route path="/">
        <Header auth={auth} userName={userName} logout={logout} />
      </Route>

      <Route path="/login">
        {auth && <Redirect to="/chatList" />}
        <Auth isLogin={true} tryLogIn={tryLogIn} />
      </Route>

      <Route path="/register">
        {auth && <Redirect to="/home" />}
        <Auth isLogin={false} tryLogIn={tryLogIn} />
      </Route>

      <ProtectedRoute exact path="/home" auth={auth} color='blue' component={DummyComponent} />

      <ProtectedRoute exact path="/chatList" auth={auth} setEncryptionKey = {setEncKey} component={ChatList} />

      <ProtectedRoute exact path="/chat/:room" auth={auth} user={userName} encryptionKey = {encryptionKey} component={Chat} />

    </Router >
  );

  return <div className="App">{content}</div>;

  async function isAuthenticated() {
    let url = "/checkAuth";
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }

  //This function is called from Auth after trying to authenticate
  function tryLogIn(authState, expiresIn, newUserName) {

    if (authState) {
      setAuth(authState);
      setUserName(newUserName);
    }
    //Here we can set callback to execute when cookie expires 

    // if (expiresIn) {
    //   setTimeout(() => {
    //     setAuth(isAuthenticated().then((data) => console.log(data)).isAuthenticated);
    //   }, expiresIn);
    // }
  }

  //just sets the cookie expiresIn value to 0
  function logout() {

    console.log('log out');

    let url = '/logout';
    fetch(url, {
      method: 'POST'
    }).then(() => {
      setAuth(false);
      setUserName('');
    });

  }

  function setEncKey(key) {
    setEncryptionKey(key);
  }

}

//Just for testing purposes
const DummyComponent = props => {

  return (

    <div>
      < div style={{
        width: '200px',
        height: '200px',
        background: props.color
      }}>
      </div >
    </div>
  );
}

export default App;
