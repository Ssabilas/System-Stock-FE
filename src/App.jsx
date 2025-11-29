import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Cek login status saat pertama kali load dan setiap kali ada perubahan
  useEffect(() => {
    const checkLogin = () => {
      const loggedIn = localStorage.getItem('isLoggedIn');
      const username = localStorage.getItem('username');
      return loggedIn === 'true' && username === 'Admin';
    };

    setIsLoggedIn(checkLogin());

    // Listen untuk perubahan di localStorage
    const handleStorageChange = () => {
      setIsLoggedIn(checkLogin());
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* Route Login */}
        <Route 
          path="/" 
          element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />} 
        />
        
        {/* Route Dashboard */}
        <Route 
          path="/dashboard" 
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" replace />} 
        />
        
        {/* Redirect semua route lain ke login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;