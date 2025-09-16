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

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
