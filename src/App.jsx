import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Profile from './pages/User/Profile';
import './App.css';

import AdminDashboard from './pages/Admin/AdminDashboard';
import SignUpPage from './pages/User/UserSignup';
import UserLogin from './pages/User/UserLogin';
import AdminLogin from './pages/Admin/AdminLogin';
import UserProtector from './service/UserProtector';
import AdminProtector from './service/AdminProtector';

function App() {
  return (
    <Router> 
      <Routes> 
        <Route path="/" element={<UserProtector><Profile /></UserProtector>} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<UserLogin />} />


        <Route path = '/admin' element = {<AdminProtector> <AdminDashboard /> </AdminProtector>} />
        <Route path = '/admin/login' element = {<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
