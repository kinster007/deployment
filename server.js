const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT|| 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
	return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);

	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unbale to append the file.')
		}
	})
	next();
});

/*
app.use((req, res, next) => {
	res.render('maintainence.hbs');
});
*/

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home of the Z',
		currentYear: new Date().getFullYear(),
		welcomeMessage: 'Welcome to the Z',
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
		currentYear: new Date().getFullYear(),
	});
});

app.get ('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'Projects',
	})
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to fetch Pal !!!',
	});
});

app.listen(port, () => {
	console.log(`Server up is ${port}`);
});