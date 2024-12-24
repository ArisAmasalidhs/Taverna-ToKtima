import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import '../styles/login.css'; // Ensure your CSS path is correct

const LoginRegisterPage = ({ setUser }) => {
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between Login and Register
  const [form, setForm] = useState({ name: '', email: '', password: '' }); // Form state
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); // Update form fields
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const url = isRegistering ? '/api/auth/register' : '/api/auth/login'; // Determine API endpoint
      const { data } = await axios.post(url, form); // Make API call
      
      setUser(data.user); // Update user state
      localStorage.setItem('token', data.token); // Store the JWT token in localStorage

      alert(isRegistering ? 'Registered successfully!' : 'Logged in successfully!');
      navigate('/profile'); // Redirect to profile page after login/register
    } catch (error) {
      console.error('Error during login/register:', error.response || error.message); // Debug error
      alert(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <section className="hero">
      <video autoPlay loop muted playsInline className="back-video">
        <source
          src="https://videos.pexels.com/video-files/3784197/3784197-hd_1920_1080_24fps.mp4"
          type="video/mp4"
        />
      </video>

      <section className="content">
        <h1>Το Κτήμα</h1>
        <div className="form-container">
          <h2>{isRegistering ? 'Register' : 'Login'}</h2>
          <form onSubmit={handleSubmit}>
            {isRegistering && (
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
          </form>
          <p>
            {isRegistering
              ? 'Already have an account? '
              : "Don't have an account? "}
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="toggle-button"
            >
              {isRegistering ? 'Login' : 'Register'}
            </button>
          </p>
        </div>
      </section>
    </section>
  );
};

export default LoginRegisterPage;
