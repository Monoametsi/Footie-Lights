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
const testDescription = "Unit tests for Footie-Lights";
/* const task = "Should get data from database and return a response"; */
const fetch = require('node-fetch');
const fs = require('fs'); 
const { Response } = jest.requireActual('node-fetch');

describe(testDescription, () => {
	
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
	
});