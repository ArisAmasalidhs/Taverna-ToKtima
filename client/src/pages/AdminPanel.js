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
      const response = await axios.get("/api/admin/carousel", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCarousels(response.data);
    } catch (err) {
      console.error("Error fetching carousel images:", err);
    }
  };

  // Fetch pending reservations
  const fetchReservations = async () => {
    try {
      const response = await axios.get("/api/reservations?status=pending", {
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
      await axios.post("/api/menu", menuItem, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchMenuItems(); // Re-fetch menu items
    } catch (err) {
      console.error("Error adding menu item:", err);
    }
  };

  const editMenuItem = async (id, updatedItem) => {
    try {
      await axios.put(`/api/menu/${id}`, updatedItem, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchMenuItems(); // Re-fetch menu items
    } catch (err) {
      console.error("Error editing menu item:", err);
    }
  };

  const deleteMenuItem = async (id) => {
    try {
      await axios.delete(`/api/menu/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchMenuItems(); // Re-fetch menu items
    } catch (err) {
      console.error("Error deleting menu item:", err);
    }
  };

  const addCarouselImage = async (formData) => {
    try {
      const response = await axios.post("/api/admin/carousel", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Added image:", response.data);
      fetchCarouselImages(); // Re-fetch carousel images
    } catch (err) {
      console.error("Error adding carousel image:", err);
    }
  };

  const deleteCarouselImage = async (id) => {
    try {
      await axios.delete(`/api/admin/carousel/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchCarouselImages(); // Re-fetch carousel images
    } catch (err) {
      console.error("Error deleting carousel image:", err);
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
          {menu.map((item) => (
            <li key={item._id}>
              {item.name} - ${item.price} ({item.category})
              <button
                onClick={() => {
                  const newPrice = prompt("Enter new price:", item.price);
                  if (newPrice) {
                    editMenuItem(item._id, { ...item, price: Number(newPrice) });
                  }
                }}
              >
                Edit
              </button>
              <button onClick={() => deleteMenuItem(item._id)}>Delete</button>
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

        <div>
          {carousels.map((image) => (
            <div key={image._id}>
              <img src={`/uploads/${image.imageUrl}`} alt="Carousel" width="200" />
              <p>{image.carouselSection}</p>
              <button onClick={() => deleteCarouselImage(image._id)}>Delete</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
