const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path');
const dirname = __dirname.slice(0, __dirname.search(/Server/i) - 1);
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URI || 'mongodb://root:usr@pwd@db/');

app.disable('etag');

const dotenv = require('dotenv');

dotenv.config({path: path.join(__dirname, '.env')});

app.use(express.static(path.join(dirname)));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.status(200).render('index');
});

app.get("/test", (req, res) => {
	client.connect()
		.then((client) => {
			const database = client.db("insert_db");
			const haiku = database.collection("haiku");
			return haiku.insertOne({
				title: "Record of a Shriveled Datum",
				content: "No bytes, no problem. Just insert a document, in MongoDB",
			})
		}).then(({ insertedId }) => {
			res.status(201).send(`You have inserted one item with id ${insertedId}`)
		}).catch(err => {
			console.warn(err)
			res.status(500)
		}).finally(() => client.close(err => err && console.warn(err)))
})


const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
	console.log(`Live at ${ PORT }`);
});