/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 var bcrypt = require('bcrypt');
module.exports = {

	'new':function (req, res) {
		// body...
		// var oldDateObj = new Date();
		// var newDateObj = new Date(oldDateObj.getTime() + 60000);
		// req.session.cookie.expires= newDateObj;
		// req.session.authenticated= true;
		// console.log(req.session);
		res.view('session/new');
	}, 
	create: function (req, res, next) {
		// body...
		console.log(req.param('email') );
		if(!req.param('email') || !req.param('password')){
			var usernamePasswordRequiredError = [{name:'usernamePasswordRequiredError',message: 'Debes Ingresar Usuario y Password'}]

				req.session.flash={
					err: usernamePasswordRequiredError
				}

				res.redirect('session/new');
				return;

		}
		User.findOneByEmail(req.param('email'),function foundUser (err, user) {
			// body...
			if(err) return next(err);

			if(!user){
				var noAccountError=[{name:'noAccount', message:"La direccion de Email " + req.param('email')+ " no fue encontrada"}]
				req.session.flash={
					err: noAccountError
				}
				console.log("NO USER");
				res.redirect('/session/new');
				return;
			}

			bcrypt.compare(req.param('password'), user.encryptedPassword, function (err, valid) {
				// body...
				if(err) return next(err);


					if(!valid){
					var usernamePasswordMismatchError=[{name: 'usernamePasswordMismatchError', message:'Combinacion de usuario y contraseña invalida'}]
					req.session.flash={
						err:usernamePasswordMismatchError
					}
						res.redirect('/session/new');
						return;
					}

					req.session.authenticated= true;
					req.session.User=user;

					res.redirect('/user/show/'+ user.id);
			});



		});




	},
	destroy: function(req, res, next){
		req.session.destroy();
		res.redirect('/session/new');

	}

	
	
};

