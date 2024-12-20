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

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/reservations', form);
      setSuccessMessage('Reservation Successful!');
      setError(null);
      setForm({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        numberOfGuests: '',
        notes: '',
      });
    } catch (err) {
      setError('An error occurred while submitting your reservation. Please try again.');
      setSuccessMessage(null);
    }
  };

  return (
    <div className="reservation-container">
      <h2>Make a Reservation</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="reservation-form">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input name="date" type="date" value={form.date} onChange={handleChange} required />
        <input name="time" type="time" value={form.time} onChange={handleChange} required />
        <input name="numberOfGuests" placeholder="Guests" value={form.numberOfGuests} onChange={handleChange} required />
        <textarea name="notes" placeholder="Special Notes" value={form.notes} onChange={handleChange} />
        <button type="submit">Submit Reservation</button>
      </form>
    </div>
  );
};

export default ReservationPage;