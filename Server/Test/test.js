jest.mock('node-fetch');
const fetch = require('node-fetch');
const app = require("../index.js");
const { appDatabase } = app;
const supertest = require("supertest");
const should = require("should");
const dotenv = require('dotenv');
const path = require('path');
const fetchData = require('./fetch-test.js');
const responseData = require('./response.js');
const dirname = __dirname.slice(0, __dirname.search(/Test/i) - 1);
dotenv.config({path: path.join(dirname, '.env')});
const server = supertest(app.app);
const { fetchTest } = fetchData;
const mongoose = require('mongoose');
const { Response } = jest.requireActual('node-fetch');
const dataBaseUrl = process.env.DATABASE;
const highlights = require('./test-model/test-model.js');
const { match_highlights_test } = highlights;

describe("Footie-Lights server", () => {

	jest.setTimeout(200000);
	
	beforeAll(async () => {
		
		return await mongoose.connect(dataBaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
		
	});
	
	afterAll(async () => {
		
		await match_highlights_test.deleteMany({}, (err, res) => {
			if(err) throw err;
		});
		
		await appDatabase.disconnect();
		app.app.listen().close();
		
		return await mongoose.disconnect();
		
	});
	
	test("should fetch data from third party API", () => {
		
		fetch.mockResolvedValue(new Response(JSON.stringify(responseData)));
		
		return fetchTest().then((result) => {
			result.length.should.not.equal(0);
			
		});
		
	});
	
	test("should check if all the API data's videos are highlights", () => {
	
		fetch.mockResolvedValue(new Response(JSON.stringify(responseData)));
		
		return fetchTest().then((result) => {
			result.map((matchData) => {
				
				matchData.videos.map((videoData) => {
					
					videoData.title.should.equal("Highlights");
					
				});
				
			});
			
		});
		
	});
	
	test("should find no duplicates in the matches array", () => {
		
		fetch.mockResolvedValue(new Response(JSON.stringify(responseData)));
		
		return fetchTest().then((result) => {
		
			let returnCount = (count) => {
				
				if(count === 1){
					return 0;
				}else{
					return count;
				}
				
			}
			
			let total = 0;
			let count = 0;
			let numberOfDuplicates = {};
			
			for(i = 0; i < result.length; i++){
			
				for(j = 0; j < result.length; j++){
				
					if(result[i].title === result[j].title){
						
						count++;
						numberOfDuplicates[result[i].title] = returnCount(count);
						
					}
				
				}
			
				count = 0;
			
			}
			
			for(duplicateNum in numberOfDuplicates){
				total += numberOfDuplicates[duplicateNum];
			}
			
			total.should.equal(0);
			
		});
		
	});
	
	test("should persist all API data to database if there arent any documents in the collection",  () => {
		
		fetch.mockResolvedValue(new Response(JSON.stringify(responseData)));
		
		return fetchTest().then(async (result) => {
		
			await match_highlights_test.countDocuments({}, async (err, count) => {
				
				(count).should.equal(0);
				
				await match_highlights_test.insertMany(result);
			})
		
		});
		
	});
	
	test(`should check if API data is identical to database data, if so remove them 
		 from the matches array and persist the non-identical ones to the database`,  async () => {
		
		let matches = [
				
				{
					title: "Sport Huancayo - Inti Gas Ayacucho",
					competition: "PERU: Primera Division, Clausura",
					matchviewUrl: "https://www.scorebat.com/embed/matchview/1062591/",
					competitionUrl: "https://www.scorebat.com/embed/competition/peru-primera-division-clausura/",
					thumbnail: "https://www.scorebat.com/og/m/og1062591.jpeg",
					date: "2021-08-18T18:00:00+0000",
					videos: [
						{
							title: "Highlights",
							embed: "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https://www.scorebat.com/embed/v/611d6f7f2e156/?utm_source=api&utm_medium=video&utm_campaign=v3' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
						}
					]
				},
				{
					title: "Ayacucho",
					competition: "PERU: Primera Division, Clausura",
					matchviewUrl: "https://www.scorebat.com/embed/matchview/1062591/",
					competitionUrl: "https://www.scorebat.com/embed/competition/peru-primera-division-clausura/",
					thumbnail: "https://www.scorebat.com/og/m/og1062591.jpeg",
					date: "2021-08-18T18:00:00+0000",
					videos: [
						{
							title: "Highlights",
							embed: "<div style='width:100%;height:0px;position:relative;padding-bottom:56.250%;'><iframe src='https://www.scorebat.com/embed/v/611d6f7f2e156/?utm_source=api&utm_medium=video&utm_campaign=v3' frameborder='0' width='100%' height='100%' allowfullscreen allow='autoplay; fullscreen' style='width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;'></iframe></div>"
						}
					]
				}
				
			];
			
		return await match_highlights_test.find().then( async (results) => {
				
				results.map((match, index) => {
				
					matches.map((match2,index) => {
						
						if(match.title === match2.title){
							matches.splice(index, 1);
						}
						
					});
				
				});
				
				matches.length.should.equal(1);
				
				await match_highlights_test.insertMany(matches);
				
			});
		
	});
	
	test("should return to home page if a match for request parameter value is not found in database", async () => {
		
		fetch.mockResolvedValue(new Response(JSON.stringify(responseData)));
		
		return await match_highlights_test.find().then(async (result) => {
		
			let emptyFilter = false; 
			
			let req = {
				params: {
					competition: '/Kazier Piefs'
				}
			};
			
			let notFound = () => {
			   let count = 0;
			   let { competition } = req.params;
			   let compName = competition;
				
				for(let matchObj of result) {
				
					let { competition } = matchObj;
				
					if(compName !== competition.slice(competition.search(":") + 1, competition.length).trim()){ 
						count++;
						if(count === result.length){
							emptyFilter = true;
						}
					}
				}
			}
			
			let response = await server.get('/Kazier Piefs');
				notFound();
				emptyFilter.should.equal(true);
				response.redirect.should.equal(true);
				response.status.should.equal(302);
			
		});
		
	});
	
	test("should return home page", async () => {
		
		fetch.mockResolvedValue(new Response(JSON.stringify(responseData)));
		
		let response = await server.get('/');
			response.error.should.equal(false);
			response.status.should.equal(200);
		
	});
	
});