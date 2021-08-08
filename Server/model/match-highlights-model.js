const mongoose = require('mongoose');
const schema = mongoose.Schema;

const match_highlights_Schema = new schema({
	
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

const match_highlights = mongoose.model('match-highlights', match_highlights_Schema);

module.exports = {
	match_highlights
}