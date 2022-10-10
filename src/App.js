import './App.css';
import Login from './components/Login';
import Notes from './components/Notes';
import React, { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    checkLogin();
  },[])
  
  function login(username,password){
    fetch(`/api/signin/?user=${username}&password=${password}`, {credentials: 'include', method: 'POST'})
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        checkLogin();
      })
  }

  function loginGuest(){
    fetch(`/api/signinguest`, {credentials: 'include', method: 'POST'})
      .then((response) => response.json())
      .then((data) => {
        login(data.username,data.password)
      })
  }

  function logout(){
    console.log("trying to log out");
    fetch(`/api/logout`, {credentials: 'include', method: 'POST'})
    .then((response) => response.json())
    .then((data) => {
      if(!data.isLoggedIn){
        setIsLoggedIn(false)
      }
    })
  }

  function checkLogin(){
    fetch(`/api/checklogin`, {credentials: 'include', method: 'POST'})
    .then((response) => response.json())
    .then((data) => {
      if(data.isLoggedIn){
        setIsLoggedIn(true)
      }else{
        setIsLoggedIn(false)
      }
    })
}

  return (
    <div className="App">
      <div className='container'>
        {isLoggedIn ? <Notes logout={logout}></Notes> : <Login login={login} loginGuest={loginGuest}></Login>}
      </div>
    </div>
  );
}

export default App;
