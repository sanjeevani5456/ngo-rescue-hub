import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import UserDashboard from './components/UserDashboard';
import NgoDashboard from './components/NgoDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/login" 
            element={
              user ? (
                user.role === 'ROLE_NGO' ? 
                  <Navigate to="/ngo-dashboard" /> : 
                  <Navigate to="/user-dashboard" />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            } 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/" /> : <RegisterPage />} 
          />
          <Route 
            path="/user-dashboard" 
            element={
              user && user.role === 'ROLE_USER' ? 
                <UserDashboard user={user} onLogout={handleLogout} /> : 
                <Navigate to="/login" />
            } 
          />
          <Route 
            path="/ngo-dashboard" 
            element={
              user && user.role === 'ROLE_NGO' ? 
                <NgoDashboard user={user} onLogout={handleLogout} /> : 
                <Navigate to="/login" />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;