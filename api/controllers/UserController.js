/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	
	//crea un usuario con todos los parametros que se le pasan desde el formulario
	'new':function (req,res) {
		// body...
		//res.locals.flash=_.clone(req.session.flash);
		res.view();
		//req.session.flash={};
	},
	create: function (req,res,next) {
		// body...
		User.create(req.params.all(), function userCreated (err,user) {
			// body...
			if(err){
				console.log(err);
				req.session.flash={
					err:err
				}
		
				
				return res.redirect('/user/new');
			}
			/**
			res.json(user);
			req.session.flash={};
			*/
			res.redirect('/user/show/'+user.id);
		});
	},
	show:function  (req,res,next) {
		// body...
		//get one user
		User.findOne(req.param('id'), function foundUser(err, user)  {
			if(err) return next(err);
			if(!user) return next();
			res.view({
				user:user
			});
		});
	},

	index: function (req, res, next) {
		// body...
		//get an array of all users
		User.find(function foundUsers (err, users) {
			if(err) return next(err);

			res.view({

				users:users
			});
		});
	}

};

