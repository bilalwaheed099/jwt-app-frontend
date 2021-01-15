import React, { useState, useEffect } from 'react';
import { Router, navigate } from '@reach/router';


import Login from './components/Login';
import Register from './components/Register';
import Content from './components/Content';
import Protected from './components/Protected';
import Navigation from './components/Navigation';

export const UserContext = React.createContext([]);

function App() {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

async function logoutCallback() {
    const result = await fetch('http://localhost:4000/logout', {
      method: 'POST',
      credentials: 'include'
    });
    //clear user from context
    setUser({});
    navigate('/');
  }

  useEffect( () => {
    async function checkRefreshToken() {
      const result = await(await fetch('http://localhost:4000/refresh-token', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      })).json();
      setUser({ accessToken: result.accessToken});
      setLoading(false);
    }
    checkRefreshToken();
  }, [])
  return (
    <UserContext.Provider value={[user, setUser]}>
      <div className="App">
        <Navigation logoutCallback={logoutCallback}/>
        <Router id="router">
          <Login path="login" />
          <Register path="register" />
          <Protected path="protected" />
          <Content path="/" />
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
