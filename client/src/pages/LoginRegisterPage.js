import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";

const LoginRegisterPage = ({ setUser }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isRegistering ? "/api/auth/register" : "/api/auth/login";
      const { data } = await axios.post(url, form);

      if (isRegistering) {
        alert("Registered successfully! Please login.");
        setIsRegistering(false);
      } else {
        const token = data.token; // Ensure the token exists here

        if (!token) {
          console.error("Token is missing from the response");
          alert("Login failed: No token received");
          return;
        }

        // Call the parent function to handle login
        setUser(data);
        localStorage.setItem("token", token);
        // navigate to the homepage after successful login
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login/register:", error.response || error.message);
      alert(error.response?.data?.message || "Something went wrong!");
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
        <h1>Welcome Στο Κτήμα</h1>
        <div className="form-container">
          <h2>{isRegistering ? "Register" : "Login"}</h2>
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
            <button type="submit">{isRegistering ? "Register" : "Login"}</button>
          </form>
          <p>
            {isRegistering
              ? "Already have an account? "
              : "Don't have an account? "}
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="toggle-button"
            >
              {isRegistering ? "Login" : "Register"}
            </button>
          </p>
        </div>
      </section>
    </section>
  );
};

export default LoginRegisterPage;
