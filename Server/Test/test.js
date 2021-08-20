jest.mock('node-fetch');
const supertest = require("supertest");
const should = require("should");
const dotenv = require('dotenv');
const path = require('path');
const fetchData = require('./fetch-test.js');
const responseData = require('./response.js');
const dirname = __dirname.slice(0, __dirname.search(/Test/i) - 1);
dotenv.config({path: path.join(dirname, '.env')});
const server = supertest.agent(process.env.CLIENT_URL);
const { fetchTest } = fetchData;
const mongoose = require('mongoose');
const testDescription = "Unit tests for Footie-Lights";
/* const task = "Should get data from database and return a response"; */
const fetch = require('node-fetch');
/* const fs = require('fs');  */
const { Response } = jest.requireActual('node-fetch');
const dataBaseUrl = process.env.DATABASE;
const highlights = require('./test-model/test-model.js');
const { match_highlights_test } = highlights;

describe(testDescription, () => {
	
	jest.setTimeout(2000000);
	
	beforeAll(async () => {
		
		return await mongoose.connect(dataBaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
		
	});
	
	afterAll(async () => {
		
		await match_highlights_test.deleteMany({}, (err, res) => {
			if(err) throw err;
		})
		
		return await mongoose.disconnect();
		
	});
	
	test("Should fetch data from third party API", () => {
		
		fetch.mockResolvedValue(new Response(JSON.stringify(responseData)));
		
		return fetchTest().then((result) => {
			result.length.should.not.equal(0);
			
		});
		
	});
	
	test('All Videos title string should match "Highlights" string', () => {
		
		fetch.mockResolvedValue(new Response(JSON.stringify(responseData)));
		
		return fetchTest().then((result) => {
			result.map((matchData) => {
				
				matchData.videos.map((videoData) => {
					
					videoData.title.should.equal("Highlights");
					
				});
				
			});
			
		});
		
	});
	
	test("Should find no duplicates in the response", () => {
		
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
	
	test("Should persist all API data to database if there arent any documents in the collection",  () => {
		
		fetch.mockResolvedValue(new Response(JSON.stringify(responseData)));
		
		return fetchTest().then(async (result) => {
		
			await match_highlights_test.countDocuments({}, async (err, count) => {
				
				(count).should.equal(0);
				
				await match_highlights_test.insertMany(result);
			})
		
		});
		
	});
	
	test(`Should check if API data is identical to database data, if so remove them 
		 from the matches array and persist the non-identical ones to the database`,  () => {
		
		fetch.mockResolvedValue(new Response(JSON.stringify(responseData)));
		
		return fetchTest().then(async (result) => {
			
			let matches = result;
			
			await match_highlights_test.find().then( async (result) => {
			
				if(result.length !== 0){
				
					await result.map((match, index) => {
					
						matches.map((match2,index) => {
							
							if(match.title === match2.title){
								matches.splice(index, 1);
							}
							
						});
					
					});
					
					if(matches.length > 0){
						await match_highlights_test.insertMany(matches);
					}
					
				}
				
			});
		
		});
		
	});
	
});