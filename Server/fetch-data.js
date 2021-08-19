const fetch = require('node-fetch');
const highlights = require('./model/match-highlights-model');
const { match_highlights } = highlights;
const date_Formater = require('./date-formater');
const { dateFormater } = date_Formater;

let fetch_data = async (req, res) => {
	let matches = [];
	let apiUrl = `https://www.scorebat.com/video-api/v3/`;
	
	await fetch(apiUrl, {
		method: 'GET'
	}).then( async (res) => {
		let response = await res.json();
		let apiData = response.response;
		
		apiData.map((elem) => {

			elem.videos.map((elem2, index) => {
				
				if(elem2.title === 'Highlights'){
					let { title, competition, date, videos } = elem;
					
					let matchInfo = {title, competition, date, videos}
					
					matches.push(matchInfo);
					
				}else{
					elem.videos.splice(index);
					
				}
				
			})
		});
	
	}).catch((err) => {
	
		throw new Error(err);
	
	});
	
	let testArr = [...new Set(matches.map(JSON.stringify))].map(JSON.parse);
	
	await match_highlights.countDocuments({}, async (err, count) => {
		//console.log("Number of matches:", count );
		
		if(count === 0){
			await match_highlights.insertMany(testArr);
		}
	})
	
	await match_highlights.find().then( async (result) => {
		
		/*  match_highlights.deleteMany({}, (err, res) => {
				if(err) throw err;
				console.log('All matches have been deleted');
			})
		*/
		
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
			
		}
		
		let emptyFilter = false;
		let notFound = () => {
		   let count = 0;
		   let { competition } = req.params;
		   let compName = competition;
			
			if(competition){
				 for(let matchObj of result) {
				
					let { title, competition, date, videos } = matchObj;
				
					if(compName !== competition.slice(competition.search(":") + 1, competition.length).trim()){ 
						count++;
						if(count === result.length){
							emptyFilter = true;
						}
					}
				}
			}
		}
		
		notFound();
		if(emptyFilter){
			
			return res.redirect("/");
		}
		
		res.status(200).render('index', { result, req, res, dateFormater });
		
	}).catch((err) => {
		console.log(err);
	});
	
}

module.exports = {
	fetch_data
}