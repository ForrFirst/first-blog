const express = require('express');
const cors = require('cors');
const profilesRouter = require('./routes/profiles');
const postsRouter = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.use('/profiles', profilesRouter);
app.use('/posts', postsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
