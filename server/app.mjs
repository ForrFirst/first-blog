const express = require('express');
const cors = require('cors');
const profilesRouter = require('./routes/profiles');
const postsRouter = require('./routes/posts');
const protectUser = require('./middleware/protectUser.mjs');
const protectAdmin = require('./middleware/protectAdmin.mjs');

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.use('/profiles', profilesRouter);
app.use('/posts', postsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// ตัวอย่างเส้นทางที่ผู้ใช้ทั่วไปที่ล็อกอินแล้วสามารถเข้าถึงได้
app.get("/protected-route", protectUser, (req, res) => {
  res.json({ message: "This is protected content", user: req.user });
});

// ตัวอย่างเส้นทางที่เฉพาะ Admin เท่านั้นที่เข้าถึงได้
app.get("/admin-only", protectAdmin, (req, res) => {
  res.json({ message: "This is admin-only content", admin: req.user });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
