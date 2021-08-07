const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const dirname = __dirname.slice(0, __dirname.search(/Server/i) - 1);

app.disable('etag');

const dotenv = require('dotenv');

dotenv.config({path: path.join(__dirname, '.env')});

app.use(express.static(path.join(dirname)));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	
	let footballHighlightData = `https://www.scorebat.com/video-api/v3/`;
	
	fetch(footballHighlightData, { 
		method: 'GET'
	} ).then( async (res) => {
		let response = await res.json();
		let results = response.response;
		
		//if(response.ok){
			for(i = 0; i < results.length; i++){
				console.log(results[i].title);
			}
		//}
		
	}).catch((err) => {
		
		console.log(err);
		
	});
	
	res.status(200).render('index');
});

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
	console.log(`Live at ${ PORT }`);
});