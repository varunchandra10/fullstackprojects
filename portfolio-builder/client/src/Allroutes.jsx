import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentUser } from './redux/currentReducer';

import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Index from './pages/Admin/Index';
import MainPage from './pages/Auth/Mainpage';
import ResetPassword from './pages/Auth/Resetpassword';

const Allroutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("Profile"));
    if (storedUser) {
      dispatch(fetchCurrentUser(storedUser));
    }
  }, [dispatch]);

  const User = useSelector((state) => state.currentUser);

  return (
    <>
      <Routes>
        <Route path='/' element={User == null ? <MainPage /> : <Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path='/portfolio/:userId' element={<Home />} />
        <Route path='/resetPassword/:token' element={<ResetPassword/>}/>
      </Routes>
    </>
  );
};

export default Allroutes;
