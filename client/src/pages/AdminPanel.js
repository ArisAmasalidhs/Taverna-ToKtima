import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdminPanel.css";

const AdminPanel = () => {
  const [menu, setMenu] = useState([]);
  const [carousels, setCarousels] = useState([]);
  const [reservations, setReservations] = useState([]);
  const categories = ["Salads", "Main Course", "Desserts", "Appetizers", "Dips", "Soups"];
  const carouselSections = ["top", "about", "bottom"];

  // Fetch menu items
  const fetchMenuItems = async () => {
    try {
      const response = await axios.get("/api/menu");
      setMenu(response.data);
    } catch (err) {
      console.error("Error fetching menu items:", err);
    }
  };

  // Fetch carousel images
  const fetchCarouselImages = async () => {
    try {
      const response = await axios.get("/api/admin/carousel");
      setCarousels(response.data);
    } catch (err) {
      console.error("Error fetching carousel images:", err);
    }
  };

  // Fetch reservations
  const fetchReservations = async () => {
    try {
      const response = await axios.get("/api/reservations", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setReservations(response.data);
    } catch (err) {
      console.error("Error fetching reservations:", err);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchMenuItems();
    fetchCarouselImages();
    fetchReservations();
  }, []);

  const addMenuItem = async (menuItem) => {
    try {
      await axios.post("/api/menu", menuItem);
      fetchMenuItems(); // Re-fetch menu items
    } catch (err) {
      console.error("Error adding menu item:", err);
    }
  };

  const editMenuItem = async (id, updatedItem) => {
    try {
      await axios.put(`/api/menu/${id}`, updatedItem);
      fetchMenuItems(); // Re-fetch menu items
    } catch (err) {
      console.error("Error editing menu item:", err);
    }
  };

  const deleteMenuItem = async (id) => {
    try {
      await axios.delete(`/api/menu/${id}`);
      fetchMenuItems(); // Re-fetch menu items
    } catch (err) {
      console.error("Error deleting menu item:", err);
    }
  };

  const addCarouselImage = async (formData) => {
    try {
      const response = await axios.post("/api/admin/carousel", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchCarouselImages(); // Re-fetch carousel images
    } catch (err) {
      console.error("Error adding carousel image:", err);
    }
  };

  const deleteCarouselImage = async (id) => {
    try {
      await axios.delete(`/api/admin/carousel/${id}`);
      fetchCarouselImages(); // Re-fetch carousel images
    } catch (err) {
      console.error("Error deleting carousel image:", err);
    }
  };

    // Update reservation status
    const updateReservationStatus = async (id, status) => {
      try {
        const response = await axios.put(
          `/api/reservations/${id}/status`,
          { status },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
  
        alert(response.data.message || `Reservation ${status}`);
        fetchReservations(); // Refresh reservations list
      } catch (err) {
        console.error(`Error updating reservation status:`, err);
      }
    };

  const handleImageError = (e) => {
    if (!e.target.src.includes("/default-placeholder.png")) {
      e.target.src = "/default-placeholder.png";
    }
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      {/* Menu Management */}
      <section>
        <h2>Menu Management</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const newMenuItem = Object.fromEntries(formData.entries());
            await addMenuItem(newMenuItem);
            e.target.reset();
          }}
        >
          <input name="name" placeholder="Dish Name" required />
          <input name="description" placeholder="Description" required />
          <input name="price" type="number" placeholder="Price" required />
          <input name="imageUrl" placeholder="Image URL" required />
          <select name="category" required>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button type="submit">Add Menu Item</button>
        </form>

        <ul>
          {menu.slice(0).reverse().map((item) => ( // Reverse for newest items first
            <li key={item._id}>
              {item.name} - ${item.price} ({item.category})
              <div className="button-container menu-button-container">
                <button
                  className="menu-button edit-button"
                  onClick={() => {
                    const newPrice = prompt("Enter new price:", item.price);
                    if (newPrice) {
                      editMenuItem(item._id, { ...item, price: Number(newPrice) });
                    }
                  }}
                >
                  Edit
                </button>
                <button
                  className="menu-button delete-button"
                  onClick={() => deleteMenuItem(item._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Carousel Management */}
      <section>
        <h2>Carousel Management</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            await addCarouselImage(formData);
            e.target.reset();
          }}
        >
          <input name="image" type="file" accept="image/*" required />
          <select name="carouselSection" required>
            <option value="">Select Carousel Section</option>
            {carouselSections.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
          <button type="submit">Add Carousel Image</button>
        </form>

        <div className="carousel-management">
          {carousels.map((image) => (
            <div key={image._id} className="carousel-image-wrapper">
              <img
                src={`/uploads/${image.imageUrl}`}
                alt="Carousel"
                width="200"
                onError={handleImageError}
              />
              <p>{image.carouselSection}</p>
              <div className="button-container carousel-button-container">
                <button
                  className="carousel-button delete-button"
                  onClick={() => deleteCarouselImage(image._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

{/* Pending Reservations */}
<section>
        <h2>Pending Reservations</h2>
        {reservations.length === 0 && <p>No pending reservations.</p>}
        {reservations.map((reservation) => (
          <div key={reservation._id} className="reservation-card">
            <p>Name: {reservation.name}</p>
            <p>Email: {reservation.email}</p>
            <p>Phone: {reservation.phone}</p>
            <p>Date: {reservation.date}</p>
            <p>Time: {reservation.time}</p>
            <p>Guests: {reservation.numberOfGuests}</p>
            <p>Status: <strong>{reservation.status}</strong></p>
            {reservation.status === "Pending" && (
              <div className="button-container">
                <button
                  onClick={() => updateReservationStatus(reservation._id, "Confirmed")}
                  className="confirm-button"
                >
                  Confirm
                </button>
                <button
                  onClick={() => updateReservationStatus(reservation._id, "Rejected")}
                  className="reject-button"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default AdminPanel;
