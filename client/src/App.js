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
  Redirect,
  Switch
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  const [auth, setAuth] = useState(false);

  const [userName, setUserName] = useState('');

  //checking basicly in componentDidMount whether user is authenticated
  useEffect(() => {
    // console.log(`App rendered, auth: ${auth}`);
    isAuthenticated()
      .then(data => {
        setAuth(data.isAuthenticated);
        console.log('Fetched data', data);
      });
  }, []);

  // useEffect(() => {
  //   console.log(`App updated, auth: ${auth}`);
  //   console.log('============================');
  // });

  const content = (
    <Router>

      <Route path="/">
        <Header auth={auth} userName={userName} logout={logout} />
        {/* <button type="button" onClick={() => setAuth(!auth)}>setAuth</button> */}
      </Route>

      <Route path="/login">
        {auth && <Redirect to="/home" />}
        <Auth isLogin={true} tryLogIn={tryLogIn} />
      </Route>

      <Route path="/register">
        {auth && <Redirect to="/home" />}
        <Auth isLogin={false} tryLogIn={tryLogIn} />
      </Route>

      <ProtectedRoute exact path="/home" auth={auth} color='blue' component={DummyComponent} />

      {/* <ProtectedRoute exact path="/chatList" auth={auth} component={ChatList} /> */}
      <Route path="/chatList">
        <ChatList auth={auth} />
      </Route>

      <Route path="/chat/:room">
        <Chat auth={auth} user={userName} />
      </Route>

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
