const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Menu = require('./models/Menu'); // Import your Menu model

dotenv.config(); // Load environment variables

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for seeding!'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Sample menu items
const menuItems = [
  {
    name: "Greek Salad",
    description: "A fresh salad with tomatoes, cucumbers, onions, olives, and feta cheese.",
    price: 8.99,
    category: "Salads",
    imageUrl: "https://www.simplyrecipes.com/thmb/0NrKQlJ691l6L9tZXpL06uOuWis=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Easy-Greek-Salad-LEAD-2-4601eff771fd4de38f9722e8cafc897a.jpg",
  },
  {
    name: "Moussaka",
    description: "A traditional baked dish with eggplant, potatoes, and ground beef topped with creamy béchamel sauce.",
    price: 12.99,
    category: "Main Course",
    imageUrl: "https://www.mygreekdish.com/wp-content/uploads/2013/05/Moussaka-recipe-Traditional-Greek-Moussaka-with-Eggplants.jpg",
  },
  {
    name: "Souvlaki",
    description: "Grilled meat skewers served with pita, tzatziki, and vegetables.",
    price: 10.99,
    category: "Main Course",
    imageUrl: "https://www.seriouseats.com/thmb/qAysZs1vJYvMCSSpsHRqRlsvExQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__20090319-pork-souvlaki-9a80ec7534d3427c888d2d0f939540a6.jpg",
  },
  {
    name: "Baklava",
    description: "A rich, sweet dessert made of layers of filo pastry, nuts, and honey syrup.",
    price: 5.99,
    category: "Desserts",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Baklava%281%29.png",
  },
];

// Function to seed the database
const seedMenu = async () => {
  try {
    await Menu.deleteMany(); // Clear existing menu items
    await Menu.insertMany(menuItems); // Insert new menu items
    console.log('Menu items seeded successfully!');
    mongoose.connection.close(); // Close connection
  } catch (err) {
    console.error('Error seeding menu items:', err);
    mongoose.connection.close();
  }
};

seedMenu();
