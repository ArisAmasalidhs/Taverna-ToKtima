import React from 'react';
import '../styles/login.css'; // Ensure the path matches your project structure

const Login = () => {
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
          <h2>Login / Register</h2>
          <form>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Login</button>
            <p>Don't have an account? <a href="/register">Register</a></p>
          </form>
        </div>
      </section>
    </section>
  );
};

export default Login;
