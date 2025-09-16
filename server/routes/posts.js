const express = require('express');
const router = express.Router();
const { validatePostData } = require('../postvalidation');

router.post('/assignments', (req, res) => {
  try {
    const validationErrors = validatePostData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: validationErrors[0]
      });
    }
    
    if (Math.random() < 0.1) {
      return res.status(500).json({
        message: "Server could not create post because database connection"
      });
    }
    
    res.status(201).json({
      message: "Created post sucessfully"
    });
    
  } catch (error) {
    res.status(500).json({
      message: "Server could not create post because database connection"
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 6, category, keyword } = req.query;
    
    if (Math.random() < 0.1) {
      return res.status(500).json({
        message: "Server could not read post because database connection"
      });
    }
    
    const response = {
      totalPosts: 30,
      totalPages: 5,
      currentPage: parseInt(page),
      limit: parseInt(limit),
      posts: [],
      nextPage: parseInt(page) < 5 ? parseInt(page) + 1 : null
    };
    
    res.status(200).json(response);
    
  } catch (error) {
    res.status(500).json({
      message: "Server could not read post because database connection"
    });
  }
});

router.get('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    
    if (Math.random() < 0.1) {
      return res.status(500).json({
        message: "Server could not read post because database connection"
      });
    }
    
    if (postId === '999' || Math.random() < 0.2) {
      return res.status(404).json({
        message: "Server could not find a requested post"
      });
    }
    
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
    
    res.status(200).json(postData);
    
  } catch (error) {
    res.status(500).json({
      message: "Server could not read post because database connection"
    });
  }
});

router.put('/:postId', (req, res) => {
  try {
    const { postId } = req.params;
    
    const validationErrors = validatePostData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: validationErrors[0]
      });
    }
    
    if (Math.random() < 0.1) {
      return res.status(500).json({
        message: "Server could not update post because database connection"
      });
    }
    
    if (postId === '999' || Math.random() < 0.2) {
      return res.status(404).json({
        message: "Server could not find a requested post to update"
      });
    }
    
    res.status(200).json({
      message: "Updated post sucessfully"
    });
    
  } catch (error) {
    res.status(500).json({
      message: "Server could not update post because database connection"
    });
  }
});

router.delete('/:postId', (req, res) => {
  try {
    const { postId } = req.params;
    
    if (Math.random() < 0.1) {
      return res.status(500).json({
        message: "Server could not delete post because database connection"
      });
    }
    
    if (postId === '999' || Math.random() < 0.2) {
      return res.status(404).json({
        message: "Server could not find a requested post to delete"
      });
    }
    
    res.status(200).json({
      message: "Deleted post sucessfully"
    });
    
  } catch (error) {
    res.status(500).json({
      message: "Server could not delete post because database connection"
    });
  }
});

module.exports = router; 