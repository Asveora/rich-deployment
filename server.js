const express = require('express');
const path = require('path');

const app = express();

// This line is the key:
app.use(express.static(path.join(__dirname, 'files')));

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});