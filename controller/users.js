const userModel = require('../model/User');

class Validator {
	validateSignup(params) {
		if (!params.firstName)
		{
			return false;
		}
		if (!params.lastName)
		{
			return false
		}
		if (!params.email)
		{
			return false;
		}
		if (!params.password)
		{
			return false;
		}
		return true;
	}
}

class User extends Validator{
	async signup(params) {
		let message = {};
		if (!this.validateSignup(params)) 
		{
			return {
				success: false,
				message: "Error- bad request",
				status: 400
			}
		}
		try {
			let checkDuplicates = await userModel.find({
				email : params.email
			});

			if (checkDuplicates.length > 0) {
				return {
					success : false,
					message : 'Error- user already exists',
					status : 203
				};
			}
		}
		catch(err) {
			return {
					success : false,
					message : 'Error- Something went worng!',
					status : 500
				};
		}
		let user = new userModel();
		user.firstName = params.firstName;
		user.lastName = params.lastName;
		user.email = params.email;
		user.password = user.generateHash(params.password);
		try {
			let saved_user = await user.save();
			message = {
				success : true,
				message : 'Signed up',
				status: 200
			}
		}
		catch(err) {
			message = {
				success : false,
				message : 'Error- Something went worng!',
				status : 500
			}
		}
		return message;
	}
}

module.exports = User;