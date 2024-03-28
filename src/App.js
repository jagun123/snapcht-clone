
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter as Router, Switch ,Route} from "react-router-dom";

import './App.css';
import Chats from './Chats';
import ChatsView from './ChatsView';
import { login, logout, selectuser } from './features/appSlice';
import { auth } from './firebase';
import Login from './Login';
import Preview from './Preview';
import WebCamCapture from  './WebCamCapture'

function App() {

  const user = useSelector(selectuser)
  const dispatch = useDispatch()

  useEffect(() => {
   auth.onAuthStateChanged((authuser) => {
     if (authuser) {
        dispatch(login({ 
          username: authuser.displayName,
          profilepic: authuser.photoURL,
          id: authuser.uid
        }))
     } else {
       dispatch(logout())
     }
   })
  }, [])
  return (
    <div className="app">
      <Router>
      {!user ? (
       <Login />
      ):(
       <>
        <img className ='app_logo' src = 'https://pbs.twimg.com/profile_images/1324384358418042880/A-ENfuMC_400x400.jpg' alt = '' />
        <div className = 'app__body'>
        <div className = 'app__bodybackground'>
        <Switch>
        <Route path = '/chats/view'>
          <ChatsView />
        </Route>
        <Route path = '/chats'>
          <Chats/>
        </Route>
        <Route path = '/preview'>
          <Preview />
        </Route>
          <Route  exact path to ='/'>
          <WebCamCapture />
          </Route>
          </Switch>
        </div>
        </div>
        </>
      )}
      </Router>
    </div>
  );
}

export default App;
