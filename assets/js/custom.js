
    $(document).ready(function () {
	// body...
	$('.form-signin2').validate({
		rules:{
			username:{
		  		minlength:6,
		  		required:true
		  	},

		  	password:{
		  		minlength:6,	
		  		required:true
		  	},

		  	email:{
		  		required:true,
		  		email:true
		  	},

		  	name:{
		  	
		  		required:true
		  	},

		  	last_name:{

		  		required:true
		  	},

		    age:{
		  		minlength:1,
		  		required:true

		  	}, 

		    country:{
		  		minlength:6,
		  		required:true
		  	},

		     genere:{
		     	minlength:6,
		  		required:true
		  	},
		  	confirmation:{
		  		minlength:6,
		  		equalsTo:'#password'
		  	}
		}, 
		success:function (element) {
			element
			.text('OK!').addClass('valid')
			// body...
		}
		
	});
});


