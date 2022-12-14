import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import SingleCampsite from './components/SingleCampsite';
import AllCampgrounds from './components/Campgrounds';
import CreateCampground from './components/CreateCampground';
import Footer from './components/Footer';
import Profile from './components/Profile';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <AllCampgrounds />
        </Route>
        <Route path='/campgrounds/:campgroundId' >
          <SingleCampsite />
        </Route>
        <Route path='/host'>
          <CreateCampground />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
