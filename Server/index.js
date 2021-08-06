const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path');
const dirname = __dirname.slice(0, __dirname.search(/Server/i) - 1);

app.disable('etag');

const dotenv = require('dotenv');

dotenv.config({path: path.join(__dirname, '.env')});

app.use(express.static(path.join(dirname)));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.status(200).render('index');
});

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
	console.log(`Live at ${ PORT }`);
});