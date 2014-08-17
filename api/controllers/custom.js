$(document).ready(function () {
	// body...

	$('#form-signin').validate({
		rules:{
			username:{
  		type: 'string',
  		unique: true
  	},
  	password:{
  		type:'string',
  		required:true
  	},
  	email:{
  		type:'email',
  		required:true
  	},
  	name:{
  		type:'string',
  		required:true
  	},
  	last_name:{
  		type:'string',
  		required:true
  	},age:{
  		type:'integer',
  		defaultsTo:18
  	}, country:{
  		type:'string',
  		required:true
  	}, genere:{
  		type:'string',
  		enum:['F','M'],
  		required:true
  	} 
		},

	});
});