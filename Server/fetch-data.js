const fetch = require('node-fetch');
const highlights = require('./model/match-highlights-model');
const { match_highlights } = highlights;
const date_Formater = require('./date-formater');
const { dateFormater } = date_Formater;

let fetch_data = async (req, res) => {
	let matches = [];
	let apiUrl = `https://www.scorebat.com/video-api/v3/`;
	
	/* Fetching data from third party API */
	await fetch(apiUrl, {
		method: 'GET'
	}).then( async (res) => {
		let response = await res.json();
		let apiData = response.response;
		
		/* Transversing array to remove objects that don't have highlight videos and pushing into a 
		   the ones that do have highlights into a new array called matches.*/
		apiData.map((matchData) => {
		
			matchData.videos.map((videoData, index) => {
				
				if(videoData.title === 'Highlights'){
					let { title, competition, date, videos } = matchData;
					
					let matchInfo = { title, competition, date, videos }
					
					matches.push(matchInfo);
					
				}else{
					matchData.videos.splice(index);
					
				}
				
			})
		});
		
		//Removing duplicates
		matches = [...new Set(matches.map(JSON.stringify))].map(JSON.parse);
		
	}).catch((err) => {
	
		const error = new Error(err)
		throw error;
	
	});
	
	/* Checking if there are any documents in the collection, if not, then the whole array gets inserted as a document */
	await match_highlights.countDocuments({}, async (err, count) => {
		
		if(count === 0){
			await match_highlights.insertMany(matches);
		}
	})
	
	//Gets data in database and returns a response.
	
	await match_highlights.find().then( async (result) => {
		
		/* Checks if there are any elements in the matches array that are identical 
		to the elements in the database, if so, those elements get removed */
			
		result.map((match, index) => {
			
			matches.map((match2,index) => {
				
				if(match.title === match2.title){
					matches.splice(index, 1);
				}
				
			});
			
		});
		
		/*if there are elements in the matches array that arent identical to those in the database insert them in the database */
		if(matches.length > 0){
			await match_highlights.insertMany(matches);
		}
		
		/* Checking if the request parameter called competition matches any of the competitions 
			in the database. If no match is made then the emptyFilter is set to true. */
		let emptyFilter = false;
		let notFound = () => {
		   let count = 0;
		   let { competition } = req.params;
		   let compName = competition;
			
			if(competition){
				 for(let matchObj of result) {
				
					let { competition } = matchObj;
				
					if(compName !== competition){ 
						count++;
						if(count === result.length){
							emptyFilter = true;
						}
					}
				}
			}
		}
		
		notFound();
		
		/* If there are no matches between the request parameter called competition and
		the competitions in the database then the user should be redirected to the homepage. */
		if(emptyFilter){
			
			return res.redirect("/");
		}
		
		res.status(200).render('index', { result, req, res, dateFormater });
		
	}).catch((err) => {
		const error = new Error(err)
		throw error;
	});
	
}

module.exports = {
	fetch_data
}