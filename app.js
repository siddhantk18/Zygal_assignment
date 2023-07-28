// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const users = require('./usersData'); // Import user data from usersData.js
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Login route
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email_id === email && user.password === password);
  if (user) {
    res.cookie('user', email);
    res.redirect('/home'); // Redirect to the home page after successful login
  } else {
    res.redirect('/login');
  }
});

// Home page route
app.get('/home', (req, res) => {
  const user = req.cookies.user;
  if (!user) {
    res.redirect('/login');
  } else {
    res.sendFile(__dirname + '/public/home.html');
  }
});

// Logout route
app.get('/logout', (req, res) => {
  res.clearCookie('user');
  res.redirect('/login');
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});


