// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const comments = require('./routes/api/comments');
app.use('/api/comments', comments);

// Handle production
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public'));
  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

// Port
const port = process.env.PORT || 5000;

// Listen
app.listen(port, () => console.log(`Server started on port ${port}`));
