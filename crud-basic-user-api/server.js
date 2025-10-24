// index.js
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./src/routes/user_routes');

app.use(cors());
app.use(express.json());

// Định nghĩa route chính
app.use('/users', router);

app.listen(4000, () => {
  console.log(' Server is running on http://localhost:4000');
});
