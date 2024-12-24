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
  {
    name: "Spanakopita",
    description: "A savory pastry filled with spinach, feta cheese, and herbs.",
    price: 7.99,
    category: "Appetizers",
    imageUrl: "https://www.olivetomato.com/wp-content/uploads/2021/08/SAM_8242-1.jpeg",
  },
  {
    name: "Dolmades",
    description: "Grape leaves stuffed with rice, pine nuts, and herbs.",
    price: 6.99,
    category: "Appetizers",
    imageUrl: "https://d1c8xu194km6ge.cloudfront.net/assets/323622/Greek_Food_-105-2_HD1280.jpg",
  },
  {
    name: "Gyro Plate",
    description: "Thinly sliced gyro meat served with pita, tzatziki, and fries.",
    price: 11.99,
    category: "Main Course",
    imageUrl: "https://img.chefkoch-cdn.de/rezepte/2826591434709897/bilder/1357702/crop-960x720/gyros-selber-machen.jpg",
  },
  {
    name: "Tzatziki",
    description: "A refreshing dip made with yogurt, cucumber, garlic, and dill.",
    price: 4.99,
    category: "Dips",
    imageUrl: "https://tastefullygrace.com/wp-content/uploads/2022/08/Tzatziki-Sauce-Recipe-1-scaled.jpg",
  },
  {
    name: "Kleftiko",
    description: "Slow-cooked lamb with garlic, herbs, and lemon.",
    price: 16.99,
    category: "Main Course",
    imageUrl: "https://www.hearthealthygreek.com/wp-content/uploads/2021/03/Lamb-Kleftiko-square.jpg",
  },
  {
    name: "Loukoumades",
    description: "Greek doughnuts drizzled with honey and sprinkled with cinnamon.",
    price: 5.99,
    category: "Desserts",
    imageUrl: "https://gimmerecipe.com/wp-content/uploads/2024/08/Loukoumades-Greek-Honey-Puffs-That-Will-Sweeten-Your-Day.webp",
  },
  {
    name: "Fasolada",
    description: "A hearty bean soup with tomatoes, carrots, and celery.",
    price: 9.99,
    category: "Soups",
    imageUrl: "https://snackconnection-marktplatz.de/wp-content/uploads/2024/02/Griechenland-Fasolada-Bohnensuppe-c-123rf-81295239_m_normal_none.jpg",
  },
  {
    name: "Galaktoboureko",
    description: "A creamy custard dessert wrapped in filo pastry and soaked in syrup.",
    price: 6.99,
    category: "Desserts",
    imageUrl: "https://nikolopaa.com/wp-content/uploads/2023/10/galaktoboureko-greek-dessert-scaled.jpg",
  },
  {
    name: "Fried Calamari",
    description: "Crispy fried calamari rings served with lemon wedges.",
    price: 8.99,
    category: "Appetizers",
    imageUrl: "https://www.willcookforsmiles.com/wp-content/uploads/2021/07/Calamari-5.jpg",
  },
  {
    name: "Briam",
    description: "Greek-style roasted vegetables with olive oil and herbs.",
    price: 10.99,
    category: "Main Course",
    imageUrl: "https://www.platingsandpairings.com/wp-content/uploads/2024/01/briam-recipe-5-scaled.jpg",
  },
  {
    name: "Stifado",
    description: "A traditional Greek beef stew cooked with onions and red wine.",
    price: 15.99,
    category: "Main Course",
    imageUrl: "https://www.maryskouzina.com.au/wp-content/uploads/STIFADO.jpg",
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
