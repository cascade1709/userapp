const fs = require('fs');
const path = require('path');

module.exports = (application) => {
	fs.readdirSync(__dirname + '/middleware').forEach( (file) => {
		require(`./middleware/${file.substr(0, file.indexOf('.'))}`)(application);
	});
};