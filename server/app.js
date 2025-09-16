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

// GET /posts endpoint with pagination and filtering
app.get('/posts', async (req, res) => {
  try {
    const { page = 1, limit = 6, category, keyword } = req.query;
    
    // Simulate database connection error (random 10% chance)
    if (Math.random() < 0.1) {
      return res.status(500).json({
        message: "Server could not read post because database connection"
      });
    }
    
    // In real application, this would be SQL query like:
    // const offset = (page - 1) * limit;
    // let query = 'SELECT * FROM posts';
    // let values = [];
    // let paramCount = 0;
    
    // if (category && keyword) {
    //   query += ' WHERE category ILIKE $1 AND (title ILIKE $2 OR description ILIKE $2 OR content ILIKE $2)';
    //   values = [`%${category}%`, `%${keyword}%`];
    //   paramCount = 2;
    // } else if (category) {
    //   query += ' WHERE category ILIKE $1';
    //   values = [`%${category}%`];
    //   paramCount = 1;
    // } else if (keyword) {
    //   query += ' WHERE title ILIKE $1 OR description ILIKE $1 OR content ILIKE $1';
    //   values = [`%${keyword}%`];
    //   paramCount = 1;
    // }
    
    // query += ` LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    // values.push(limit, offset);
    
    // const result = await pool.query(query, values);
    // const totalCount = await pool.query('SELECT COUNT(*) FROM posts');
    
    // For now, return mock response structure
    const response = {
      totalPosts: 30,
      totalPages: 5,
      currentPage: parseInt(page),
      limit: parseInt(limit),
      posts: [], // This would be result.rows from SQL query
      nextPage: parseInt(page) < 5 ? parseInt(page) + 1 : null
    };
    
    // Success response
    res.status(200).json(response);
    
  } catch (error) {
    res.status(500).json({
      message: "Server could not read post because database connection"
    });
  }
});

// GET /posts/:postId endpoint
app.get('/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    
    // Simulate database connection error (random 10% chance)
    if (Math.random() < 0.1) {
      return res.status(500).json({
        message: "Server could not read post because database connection"
      });
    }
    
    // Simulate post not found (random 20% chance for invalid IDs)
    if (postId === '999' || Math.random() < 0.2) {
      return res.status(404).json({
        message: "Server could not find a requested post"
      });
    }
    
    // In real application, this would be SQL query like:
    // const result = await pool.query('SELECT * FROM posts WHERE id = $1', [postId]);
    // if (result.rows.length === 0) {
    //   return res.status(404).json({
    //     message: "Server could not find a requested post"
    //   });
    // }
    // return res.status(200).json(result.rows[0]);
    
    // For now, return mock response structure
    const postData = {
      id: parseInt(postId),
      image: "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/e739huvlalbfz9eynysc.jpg",
      category: "Cat",
      title: "The Art of Mindfulness: Finding Peace in a Busy World",
      description: "Discover the transformative power of mindfulness and how it can help you navigate the challenges of modern life with greater ease and contentment.",
      date: "2024-09-10T17:00:00.000Z",
      content: "## 1. Understanding Mindfulness\n\nMindfulness is the practice of being fully present and engaged in the moment, aware of your thoughts and feelings without distraction or judgment.\n\n## 2. Benefits of Mindfulness\n\nRegular mindfulness practice can reduce stress, improve focus, enhance emotional regulation, and boost overall well-being.\n\n## 3. Simple Mindfulness Techniques\n\nLearn easy-to-implement mindfulness exercises, from deep breathing to body scans, that you can incorporate into your daily routine.\n\n## 4. Mindfulness in Daily Life\n\nDiscover how to bring mindfulness into everyday activities, from eating to working, to create a more balanced and fulfilling life.\n\n## 5. Overcoming Challenges\n\nAddress common obstacles to mindfulness practice and learn strategies to maintain consistency in your mindfulness journey.",
      status: "publish",
      likes_count: 0
    };
    
    // Success response
    res.status(200).json(postData);
    
  } catch (error) {
    res.status(500).json({
      message: "Server could not read post because database connection"
    });
  }
});

// PUT /posts/:postId endpoint
app.put('/posts/:postId', (req, res) => {
  try {
    const { postId } = req.params;
    const { title, image, category_id, description, content, status_id } = req.body;
    
    // Simulate database connection error (random 10% chance)
    if (Math.random() < 0.1) {
      return res.status(500).json({
        message: "Server could not update post because database connection"
      });
    }
    
    // Simulate post not found (random 20% chance for invalid IDs)
    if (postId === '999' || Math.random() < 0.2) {
      return res.status(404).json({
        message: "Server could not find a requested post to update"
      });
    }
    
    // Success response
    res.status(200).json({
      message: "Updated post sucessfully"
    });
    
  } catch (error) {
    res.status(500).json({
      message: "Server could not update post because database connection"
    });
  }
});

// DELETE /posts/:postId endpoint
app.delete('/posts/:postId', (req, res) => {
  try {
    const { postId } = req.params;
    
    // Simulate database connection error (random 10% chance)
    if (Math.random() < 0.1) {
      return res.status(500).json({
        message: "Server could not delete post because database connection"
      });
    }
    
    // Simulate post not found (random 20% chance for invalid IDs)
    if (postId === '999' || Math.random() < 0.2) {
      return res.status(404).json({
        message: "Server could not find a requested post to delete"
      });
    }
    
    // Success response
    res.status(200).json({
      message: "Deleted post sucessfully"
    });
    
  } catch (error) {
    res.status(500).json({
      message: "Server could not delete post because database connection"
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
