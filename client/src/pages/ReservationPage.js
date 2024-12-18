import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ReservationPage.css';


const ReservationPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    numberOfGuests: '',
    notes: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/reservations', form)
      .then(() => alert('Reservation Successful!'))
      .catch((err) => console.error(err));
  };

  return (
    <div className="reservation-container">
      <h2>Make a Reservation</h2>
      <form onSubmit={handleSubmit} className="reservation-form">
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="phone" placeholder="Phone" onChange={handleChange} required />
        <input name="date" type="date" onChange={handleChange} required />
        <input name="time" type="time" onChange={handleChange} required />
        <input name="numberOfGuests" placeholder="Guests" onChange={handleChange} required />
        <textarea name="notes" placeholder="Special Notes" onChange={handleChange} />
        <button type="submit">Submit Reservation</button>
      </form>
    </div>
  );
};

export default ReservationPage;
