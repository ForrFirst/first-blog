const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/profiles', (req, res) => {
  const profileData = {
    data: {
      name: "john",
      age: 20
    }
  };
  
  res.status(200).json(profileData);
});

// POST /assignments endpoint
app.post('/assignments', (req, res) => {
  try {
    const { title, image, category_id, description, content, status_id } = req.body;
    
    // Validate required fields
    if (!title || !image || !category_id || !description || !content || !status_id) {
      return res.status(400).json({
        message: "Server could not create post because there are missing data from client"
      });
    }
    
    // Simulate database connection error (random 10% chance)
    if (Math.random() < 0.1) {
      return res.status(500).json({
        message: "Server could not create post because database connection"
      });
    }
    
    // Success response
    res.status(201).json({
      message: "Created post sucessfully"
    });
    
  } catch (error) {
    res.status(500).json({
      message: "Server could not create post because database connection"
    });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
