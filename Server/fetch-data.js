const fetch = require('node-fetch');
const highlights = require('./model/match-highlights-model');
const { match_highlights } = highlights;
const uuid = require('uuid');

let fetch_data = async (req, res) => {
	let matches = [];
	let footballHighlightData = `https://www.scorebat.com/video-api/v3/`;
	
	await fetch(footballHighlightData, {
		method: 'GET'
	}).then( async (res) => {
		let response = await res.json();
		let results = response.response;
		
		results.map((elem) => {

			elem.videos.map((elem2, index) => {
				
				if(elem2.title === 'Highlights'){
					let { title, competition, date, videos } = elem;
					
					let matchObj = {
						title,
						competition,
						date,
						videos
					}
					
					matches.push(matchObj);
					
				}else{
					elem.videos.splice(index);
					
				}
				
			})
		});
	
	}).catch((err) => {
	
		console.log(err);
	
	});
	
	let testArr = [...new Set(matches.map(JSON.stringify))].map(JSON.parse);
	
	await match_highlights.countDocuments({}, async function( err, count){
		console.log( "Number of users:", count );
		
		if(count === 0){
			await match_highlights.insertMany(testArr);
		}
	})
	
	await match_highlights.find().then( async (result) => {
		
		/*  match_highlights.deleteMany({}, (err, res) => {
				if(err) throw err;
				console.log('item from Advertisers DB has been deleted');
			}) */
		
		if(result.length !== 0){
			
			await result.map((match, index) => {
				
				testArr.map((match2,index) => {
					
					if(match.title === match2.title){
						testArr.splice(index, 1);
					}
					
				});
				
			});
			
			if(testArr.length > 0){
				await match_highlights.insertMany(testArr);
			}
			
			//console.log(testArr);
			
		}
		
		console.log(`Amount: ${ result.length }`)
		res.status(200).render('index', { result });
		
	}).catch((err) => {
		console.log(err);
	});
	
}

module.exports = {
	fetch_data
}