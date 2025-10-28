import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  const profileData = {
    data: {
      name: "john",
      age: 20
    }
  };
  
  res.status(200).json(profileData);
});

export default router;