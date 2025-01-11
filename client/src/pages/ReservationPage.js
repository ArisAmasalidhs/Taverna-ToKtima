import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ReservationPage.css';
import fireplaceVideo from '../assets/fireplace.mp4'; // Ensure the correct path to the video

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

  const isDateInPast = (date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    // Compare only the date parts (ignore time)
    return selectedDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isDateInPast(form.date)) {
      setError('The date you entered is invalid. Please select a future date.');
      setSuccessMessage(null);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.post('http://localhost:5000/api/reservations', form, config);
      setSuccessMessage('Your reservation has been submitted successfully!');
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
      if (err.response && err.response.status === 400) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred while submitting your reservation. Please try again.');
      }
      setSuccessMessage(null);
    }
  };

  return (
    <div>
      {/* Background Video */}
      <video autoPlay loop muted className="reservation-video">
        <source src={fireplaceVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="reservation-container">
        <h2>Make a Reservation</h2>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="reservation-form">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
          />
          <input
            name="time"
            type="time"
            value={form.time}
            onChange={handleChange}
            required
          />
          <input
            name="numberOfGuests"
            type="number"
            placeholder="Guests"
            value={form.numberOfGuests}
            onChange={handleChange}
            required
          />
          <textarea
            name="notes"
            placeholder="Special Notes"
            value={form.notes}
            onChange={handleChange}
          />
          <button type="submit">Submit Reservation</button>
        </form>
      </div>
    </div>
  );
};

export default ReservationPage;
