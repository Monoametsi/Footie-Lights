const fetch = require('node-fetch');

const fetchTest = async () => {
	
	let matches = [];
	const apiUrl = `https://www.scorebat.com/video-api/v3/`;
	
	await fetch(apiUrl, {
		method: 'GET'
	}).then( async (res) => {
		const response = await res.json();
		const apiData = response.response;
		
		apiData.map((matchData) => {
			
			matchData.videos.map((videoData, index) => {
				
				if(videoData.title === 'Highlights'){
					
					const { title, competition, date, videos } = matchData;
					
					let matchInfo = { title, competition, date, videos };
					
					matches.push(matchInfo);
					
				}else{
					
					matchData.videos.splice(index);
					
				}
				
			})
		})
		
		matches = [...new Set(matches.map(JSON.stringify))].map(JSON.parse);
		
	}).catch((err) => {
		
		throw new Error(err);
	
	});
	
	return matches;
	
}

module.exports = {
	fetchTest
}

/* fetchTest().then((result) => {
	
	fs.readFile(path.join(__dirname, 'response.js'),  "utf8", (err, data) => {
	
		if(data.trim().length === 0){
			fs.writeFile(path.join(__dirname, 'response.js'), JSON.stringify(result, null, '\t'), (err) => {
			  if (err) throw err;
			  console.log("Saved");
			});
		}
	
	});
	
}); */