
// a few items of necessary boilerplate related to express.js:

const express = require('express');
const app = express();
const PORT = process.env.PORT || 4001;

// reusable bits of html:
const headerscript = '<!DOCTYPE html><html><head><title>Class Reads</title><link rel="stylesheet" type="text/css" href="/style.css"><link rel="icon" type="image/svg+xml" href="favicon.ico"></head><body><div class="gridcontainer">';
const pageheading = '<div class="mainpageright"><h1 class="pageheading">Class Reads</h1>';
const pageending = '</div><div class="lowerleftcorner"></div><div class="footerright"><p><a href="/">return to home</a></p></div></div></body></html>';

// the registration form needs some serious work, so I'm commenting it out for now

//const registrationform = '<div><form action="/registration">User Name:<br><input type="text" name="user"><br><input type="password" name="password"><input type="submit" value="Register"></form></div>';

// this silly password retriever is a dumb experiment, but I'm holding on to the code for the moment.

//const prform = '<div><form action="/retrievepassword">User Name:<br><input type="text" name="user"><br><input type="submit" value="Retrieve"></form></div>';

// the navmenu/sidebar uses a loop to make it simpler to edit:

// I'm holding on to two versions of the navmenu for the time being. The sillier one is commented out.

//const navmenu = [['/','Welcome'],['/register','Register'],['/login','Login'],['/rate','Rate'],['/browse','Browse'],['/resources','Resources'],['/users','View Users'],['/pr','Password Retrieval']];

const navmenu = [['/','Welcome'],['/register','Register'],['/login','Login'],['/rate','Rate'],['/browse','Browse'],['/resources','Resources']];

let sidebar = '<div class="sidebarleft">';
for (var i in navmenu){
	sidebar = sidebar + '<p><a href="' + navmenu[i][0] + '">' + navmenu[i][1] + '</a></p>';
}
sidebar = sidebar + '</div>';

// I experimented with saving users, and I'll have to come back to that concept later, so I'm not removing the code yet:

//let users = [];

// here are the pages that make up the site:

app.get('/', (req, res) => res.send(headerscript + sidebar + pageheading + '<h2>Welcome!<br>Class Reads is a site with ideas for class reading.</h2><p>Please <a href="/register">register</a> or <a href="/login">login</a>.' + pageending));

// No registration form right now:

//app.get('/register', (req, res) => res.send(headerscript + sidebar + pageheading + '<h2>Register for full access to Class Reads</h2>' + registrationform + pageending));
app.get('/register', (req, res) => res.send(headerscript + sidebar + pageheading + '<h2>Register for full access to Class Reads</h2>' + pageending));



app.get('/login', (req, res) => res.send(headerscript + sidebar + pageheading + '<h2>Login here.</h2>' + pageending));
app.get('/rate', (req, res) => res.send(headerscript + sidebar + pageheading + '<h2>Please contribute your insights to Class Reads.</h2>' + pageending));
app.get('/browse', (req, res) => res.send(headerscript + sidebar + pageheading + '<h2>Find your next great Class Read here!</h2>' + pageending));
app.get('/resources', (req, res) => res.send(headerscript + sidebar + pageheading + '<h2>Check out these other helpful sites.</h2>' + pageending));

/* // the registration form won't be used until it's fixed/rewritten:

app.get('/registration', (req, res) => {
	var user = {};
	user.username = req.query["user"];
	user.password = req.query["password"];
	users.push(user);
	res.send(headerscript + sidebar + pageheading + '<h2>Registration Successful</h2>' + pageending);
});

// the user page is silly and I'll probably eliminate it soon enough:

app.get('/users', (req, res) => {
	let userlist = '<div class="userlist">';
	for (var i in users){
		userlist = userlist + '<p>' + users[i].username + '</p>';
	}
	userlist = userlist + '</div>';
	res.send(headerscript + sidebar + pageheading + '<h2>Here are our users so far.<br>We appreciate each one of you!</h2>' + userlist + pageending);
});

// these password retrieval pages were strictly experimental:

app.get('/pr', (req, res) => res.send(headerscript + sidebar + pageheading + '<h2>Enter a username to retrieve their password</h2>' + prform + pageending));
app.get('/retrievepassword', (req, res) => {
	let userpasswords = [];
	for (var i in users){
		if (users[i].username === req.query["user"]){
			userpasswords.push(users[i].password);
		}
	}
	let retrieval = '<div class="pretrieval"><p>Users found: ' + userpasswords.length + '</p><ol>';
	for (var i in userpasswords){
		retrieval = retrieval + '<li>' + userpasswords[i] + '</li>';
	}
	retrieval = retrieval + '</ol></div>';
	res.send(headerscript + sidebar + pageheading + '<h2>Here are your results:</h2>' + retrieval + pageending);
});
*/

// The style sheet seems good enough for the time being:

app.get('/style.css', (req, res) => {
	res.type('css');
	res.send('html {background-color: #E8E8B0; font-family: sans-serif; font-size: 11px; text-align: left;} h1 {font-family: Georgia, serif;} ol {list-style-position: inside;} .pageheading {color: #8F3000; font-size: 200%;} .gridcontainer {display: grid; grid-template-columns: 1fr 4fr; grid-template-rows: 4fr 1fr; height: 90vh;} .sidebarleft {grid-row: 1; grid-column: 1;} .mainpageright {grid-row: 1; grid-column: 2;} .lowerleftcorner {grid-row: 2; grid-column: 1;} .footerright {grid-row: 2; grid-column: 2;}');
});

// The favicon appears to work well in firefox. No luck in chrome:

app.get('/favicon.ico', (req, res) => {
	res.type('image/svg+xml');
	res.send('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><style> .bigger {font: bold 350px serif;} </style><title>Class Reads Favicon</title><polygon points="250,0 250,250 500,250 500,0" fill="#5068B3"/><text x="0" y="359" fill="black" class="bigger">CR</text></svg>');
});

// This is one final bit of boiler plate to get the page going:

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});