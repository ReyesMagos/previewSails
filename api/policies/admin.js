module.exports = function(req, res, ok){
	
	if(req.session.User && req.session.User.admin){
		return ok();
	}else{
		var requiereAdminError= [{name: 'requiereAdminError', message: 'You must be an admin.'}]
		req.session.flash={
			err: requiereAdminError
		}
		res.redirect('/session/new');
		return;
	}


};