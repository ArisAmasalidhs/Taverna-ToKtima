import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdminPanel.css";

const AdminPanel = () => {
  const [menu, setMenu] = useState([]);
  const [carousels, setCarousels] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const menuResponse = await axios.get("/api/menu");
        const carouselResponse = await axios.get("/api/carousel");
        const reservationResponse = await axios.get(
          "/api/reservations?status=pending"
        );
        setMenu(menuResponse.data);
        setCarousels(carouselResponse.data);
        setReservations(reservationResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const addMenuItem = async (menuItem) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token
      const response = await axios.post("/api/menu", menuItem, {
        headers: { Authorization: `Bearer ${token}` }, // Include token
      });
      setMenu([...menu, response.data]);
    } catch (err) {
      console.error("Error adding menu item:", err);
    }
  };

  const addCarouselImage = async (image) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token
      const response = await axios.post("/api/carousel", image, {
        headers: { Authorization: `Bearer ${token}` }, // Include token
      });
      setCarousels([...carousels, response.data]);
    } catch (err) {
      console.error("Error adding carousel image:", err);
    }
  };

  const approveReservation = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token
      await axios.put(
        `/api/reservations/approve`,
        { reservationId: id },
        {
          headers: { Authorization: `Bearer ${token}` }, // Include token
        }
      );
      setReservations(reservations.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Error approving reservation:", err);
    }
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      {/* Add Menu Item */}
      <section>
        <h2>Menu Management</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const newMenuItem = Object.fromEntries(formData.entries());
            await addMenuItem(newMenuItem);
            e.target.reset(); // Clear form
          }}
        >
          <input name="name" placeholder="Dish Name" required />
          <input name="description" placeholder="Description" required />
          <input name="price" type="number" placeholder="Price" required />
          <input name="imageUrl" placeholder="Image URL" required />
          <button type="submit">Add Menu Item</button>
        </form>

        <ul>
          {menu.map((item) => (
            <li key={item._id}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Carousel Management</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const newImage = Object.fromEntries(formData.entries());
            await addCarouselImage(newImage);
            e.target.reset(); // Clear form
          }}
        >
          <input name="imageUrl" placeholder="Image URL" required />
          <button type="submit">Add Carousel Image</button>
        </form>

        <div>
          {carousels.map((image) => (
            <div key={image._id}>
              <img src={image.imageUrl} alt="Carousel" width="200" />
            </div>
          ))}
        </div>
      </section>

      {/* Pending Reservations */}
      <section>
        <h2>Pending Reservations</h2>
        {reservations.map((reservation) => (
          <div key={reservation._id}>
            <p>{reservation.name}</p>
            <button onClick={() => approveReservation(reservation._id)}>
              Approve
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AdminPanel;
