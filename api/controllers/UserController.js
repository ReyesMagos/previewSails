/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


    //crea un usuario con todos los parametros que se le pasan desde el formulario
    'new': function(req, res) {
        // body...
        //res.locals.flash=_.clone(req.session.flash);

        res.view();
        //req.session.flash={};
    },
    create: function(req, res, next) {
        // body...
        var userObj = {
            username: req.param('username'),
            email: req.param('email'),
            name: req.param('name'),
            last_name: req.param('last_name'),
            country: req.param('country'),
            age: req.param('age'),
            genere: req.param('genere'),
            password: req.param('password'),
            confirmation: req.param('confirmation')
        }

        User.create(userObj, function userCreated(err, user) {
            if (err) {
                console.log(err);
                req.session.flash = {
                    err: err
                }
                res.redirect('/user/new');
                return;
            }

            req.session.authenticated = true;
            req.session.User = user;

            user.online = true;
            user.save(function(err, user) {
                // body...
                if (err)
                    return next(err);

                if (req.session.User.admin) {
                    res.redirect('/user');
                    return;
                }
                /**
			res.json(user);
			req.session.flash={};
			*/
                res.redirect('/user/show/' + user.id);

            });

        });
    },
    show: function(req, res, next) {
        // body...
        //get one user
        User.findOne(req.param('id'), function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next();
            res.view({
                user: user
            });
        });
    },

    index: function(req, res, next) {
        // body...
        //get an array of all users
        //console.log(new Date());
        //console.log(req.session.authenticated);
        console.log('hello');
        User.find(function foundUsers(err, users) {
            if (err) return next(err);

            res.view({

                users: users
            });
        });
    },

    edit: function(req, res, next) {
        // body...
        User.findOne(req.param('id'), function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next();
            res.view({
                user: user
            });
        });
    },

    update: function(req, res, next) {
        // body...
        if (req.session.User.admin) {
            var userObj = {
                username: req.param('username'),
                email: req.param('email'),
                name: req.param('name'),
                last_name: req.param('last_name'),
                country: req.param('country'),
                age: req.param('age'),
                genere: req.param('genere'),
                admin: req.param('admin')

            }
        } else {
            var userObj = {
                username: req.param('username'),
                email: req.param('email'),
                name: req.param('name'),
                last_name: req.param('last_name'),
                country: req.param('country'),
                age: req.param('age'),
                genere: req.param('genere')
            }

        }

        User.update(req.param('id'), userObj, function userUpdate(err, user) {
            if (err) {
                return res.redirect('/user/edit' + req.param('id'));
            }
            res.redirect('/user/show/' + req.param('id'));
        });
    },

    destroy: function(req, res, next) {

        User.findOne(req.param('id'), function foundUser(err, user) {
            var userId = req.session.User.id;

            User.update(userId, {
                online: false
            }, function(err) {
                // body...
                if (err) return next(err);
                req.session.destroy();
                res.redirect('/session/new');
            });

            //if(err) return next(err);
            //if(!user) return next('El Usuario no existe.');

            //	User.destroy(req.param('id'),function userDestroyed (err) {
            // body...
            //		if(err) return next(err);
            //	});


        });
    }

};