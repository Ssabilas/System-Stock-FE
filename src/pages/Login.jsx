import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState(''); // State untuk error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError(''); // Clear error ketika user mulai mengetik
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  
  // validasi cek username dan password sesuai dengan default
  if (formData.username === 'Admin' && formData.password === 'Admin#123') {
    // Login berhasil
    console.log('Login successful!');
    
    // Simpan status login ke localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', formData.username);
    
    // Redirect ke dashboard pakai force reload
    window.location.href = '/dashboard';
  } else {
    // Login gagal
    setError('Username atau password salah!');
    console.log('Login failed!');
  }
};

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="market-name">Stock Management</h1>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>
          
          {/* Tampilkan error message jika ada */}
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;