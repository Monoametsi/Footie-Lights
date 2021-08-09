const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const fetchData = require('./fetch-data');
const { fetch_data } = fetchData;
const dirname = __dirname.slice(0, __dirname.search(/Server/i) - 1);

app.disable('etag');

const dotenv = require('dotenv');

app.use(express.static(path.join(dirname)));
dotenv.config({path: path.join(__dirname, '.env')});
app.set('view engine', 'ejs');

app.get('/', fetch_data);
app.get('/:competition', fetch_data);

app.use((req, res) => {
	return res.redirect("/");
});

const PORT = process.env.PORT || 4500;
const dataBaseUrl = process.env.DATABASE;

mongoose.connect(dataBaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
	
	app.listen(PORT, () => {
		console.log(`Live at ${ PORT }`);
	});
	
}).catch((err) => {
	console.log(err);
})