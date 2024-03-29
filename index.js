// Boilerplate related to express.js:

const express = require('express');

const app = express();
const PORT = process.env.PORT || 4001;

// link separate site files

app.use(express.static('sitefiles'));

// Reusable bits of html:

const headerscript = '<!DOCTYPE html><html><head><title>Class Reads</title><link rel="stylesheet" type="text/css" href="/style.css"><link rel="icon" type="image/svg+xml" href="favicon.ico"></head><body><div class="gridcontainer">';
const pageheading = '<div class="mainpageright"><h1 class="pageheading">Class Reads</h1>';
const pageending = '</div><div class="lowerleftcorner"></div><div class="footerright"><p><a href="/">return to home</a></p></div></div></body></html>';
const newentry = '<div><form action="/entryadd"><br>Title:<br><input type="text" name="title"><br>Author:<br><input type="text" name="author"><br>Year:<br><input type="text" name="year"><br>Genre:<br><input type="text" name="genre"><br>Grade:<br><input type="text" name="grade"><br><input type="submit" value="Contribute!"></form></div>';

// The sidebar uses a loop to make it simpler to edit:

const navmenu = [['/', 'Welcome'], ['/register', 'Register'], ['/login', 'Login'], ['/rate', 'Rate'], ['/browse', 'Browse'], ['/resources', 'Resources'], ['/add', 'Add a New Entry'], ['/entries', 'View Entries']];
const sidebar = `<div class="sidebarleft">${navmenu.map(([href, text]) => `<p><a href="${href}">${text}</a></p>`)}</div>`;

const entries = [];
let entrynumber = 0;

// All the pages that make up the site:

app.get('/', (req, res) => res.send(`${headerscript + sidebar + pageheading}<h2>Welcome!<br>Class Reads is a site with ideas for class reading.</h2><p>Please <a href="/register">register</a> or <a href="/login">login</a>.${pageending}`));
app.get('/register', (req, res) => res.send(`${headerscript + sidebar + pageheading}<h2>Register for full access to Class Reads</h2>${pageending}`));
app.get('/login', (req, res) => res.send(`${headerscript + sidebar + pageheading}<h2>Login here.</h2>${pageending}`));
app.get('/rate', (req, res) => res.send(`${headerscript + sidebar + pageheading}<h2>Please contribute your insights to Class Reads.</h2>${pageending}`));
app.get('/browse', (req, res) => res.send(`${headerscript + sidebar + pageheading}<h2>Find your next great Class Read here!</h2>${pageending}`));
app.get('/resources', (req, res) => res.send(`${headerscript + sidebar + pageheading}<h2>Check out these other helpful sites.</h2>${pageending}`));
app.get('/entries', (req, res) => res.send(`${headerscript + sidebar + pageheading}<h2>Here are the entries we have so far:</h2>${entries.forEach((a) => `<p><a href="/entryid/${a.id}">${a.title}</a></p>`)}${pageending}`));

// Sends new entries:

app.get('/add', (req, res) => res.send(`${headerscript + sidebar + pageheading}<h2>Please contribute your insight!</h2>${newentry}${pageending}`));

// Accepts new entries:

app.get('/entryadd', (req, res) => {
  const entry = { ...req.query };
  entry.id = entrynumber;
  entrynumber += 1;
  res.send(`${headerscript + sidebar + pageheading}<h2>Thank you for your contribution!</h2>${pageending}`);
});

// The style sheet used throughout the site:

app.get('/style.css', (req, res) => {
  res.type('css');
  res.send('html {background-color: #E8E8B0; font-family: sans-serif; font-size: 11px; text-align: left;} h1 {font-family: Georgia, serif;} ol {list-style-position: inside;} .pageheading {color: #8F3000; font-size: 200%;} .gridcontainer {display: grid; grid-template-columns: 1fr 4fr; grid-template-rows: 9fr 1fr; height: 100vh;} .sidebarleft {grid-row: 1; grid-column: 1;} .mainpageright {grid-row: 1; grid-column: 2;} .lowerleftcorner {grid-row: 2; grid-column: 1;} .footerright {grid-row: 2; grid-column: 2;}');
});

// SVG favicon. Works in firefox, not chrome:

app.get('/favicon.ico', (req, res) => {
  res.type('image/svg+xml');
  res.send('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><style> .bigger {font: bold 350px serif;} </style><title>Class Reads Favicon</title><polygon points="250,0 250,250 500,250 500,0" fill="#5068B3"/><text x="0" y="359" fill="black" class="bigger">CR</text></svg>');
});

// Final boilerplate:

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
