const mongoose = require('mongoose');
const schema = mongoose.Schema;

const match_highlights_test_Schema = new schema({
	
	title: {
		type: String,
		required: true
	},
	competition: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	videos: {
		type: Array,
		required: false
	}
	
});

const match_highlights_test = mongoose.model('match-highlights-test', match_highlights_test_Schema);

module.exports = {
	match_highlights_test
}