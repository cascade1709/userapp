const UserController = require('../controller/users');

module.exports = (app) => {
	app.post('/signup', async (req, res) => {
		let user = new UserController();
		let response = await user.signup(req.body);
		let {status} = response;
		res.status(status).json(response);
	});

	app.post('/signin', async (req, res) => {

	});
}