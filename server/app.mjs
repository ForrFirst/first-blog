import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import profilesRouter from './routes/profiles.js';
import postsRouter from './routes/posts.js';
import postRoutes from './routes/postRoutes.mjs';
import authRouter from './routes/auth.mjs';
import protectUser from './middleware/protectUser.mjs';
import protectAdmin from './middleware/protectAdmin.mjs';

const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRouter);
app.use('/profiles', profilesRouter);
app.use('/posts', postsRouter);
app.use('/posts', postRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// ตัวอย่างเส้นทางที่ผู้ใช้ทั่วไปที่ล็อกอินแล้วสามารถเข้าถึงได้
app.get("/protected-route", protectUser, (req, res) => {
  res.json({ message: "This is protected content", user: req.user });
});

// ตัวอย่างเส้นทางที่เฉพาะ Admin เท่านั้นที่เข้าถึงได้
app.get("/admin-only", protectAdmin, (req, res) => {
  res.json({ message: "This is admin-only content", admin: req.user });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
