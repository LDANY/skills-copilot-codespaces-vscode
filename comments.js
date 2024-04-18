// Create web server
// Run node comments.js
// Go to localhost:3000

// Require express
const express = require('express');
// Create express app
const app = express();
// Require body-parser
const bodyParser = require('body-parser');
// Require fs
const fs = require('fs');
// Require path
const path = require('path');

// Set view engine to ejs
app.set('view engine', 'ejs');
// Set views to views folder
app.set('views', path.join(__dirname, 'views'));
// Use body-parser
app.use(bodyParser.urlencoded({extended: false}));

// Get comments from comments.json
app.get('/', (req, res) => {
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const comments = JSON.parse(data);
    res.render('index', { comments });
  });
});

// Post comments to comments.json
app.post('/', (req, res) => {
  const newComment = req.body;
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const comments = JSON.parse(data);
    comments.push(newComment);
    fs.writeFile('./comments.json', JSON.stringify(comments, null, 2), err => {
      if (err) {
        console.error(err);
        return;
      }
      res.redirect('/');
    });
  });
});

// Listen on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});