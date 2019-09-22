const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const config = require("./config/config");

const application = express();
const isDev = true;

mongoose.connect(isDev ? config.db_dev : config.db, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

application.use(bodyParser.json());

require('./routes')(application);

application.use((req, res) => {
	res.status(404).json({
		success : false,
		message : "Error - Not Found"
	});
})

application.listen(3000);
