import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import '../styles/MenuPage.css';
import gyrosVideo from '../assets/gyroscut.mp4'; // Adjust the path if necessary

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/menu') // Replace with your backend endpoint
      .then((response) => setMenuItems(response.data))
      .catch((error) => console.error('Error fetching menu:', error));
  }, []);

  const categories = [...new Set(menuItems.map((item) => item.category))]; // Extract unique categories

  return (
    <div>
      {/* Background Video */}
      <video autoPlay loop muted className="menu-video">
        <source src={gyrosVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="menu-container">
        <h2 className="menu-title">Our Menu</h2>
        {categories.map((category) => (
          <div key={category} className="menu-section">
            <h3 className="menu-category">{category}</h3>
            <div className="menu-cards">
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <Card key={item._id} className="menu-card">
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.imageUrl || 'https://via.placeholder.com/300x200'}
                      alt={item.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                      <Typography variant="h6" color="text.primary">
                        ${item.price}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
