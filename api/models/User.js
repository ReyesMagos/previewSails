/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema:true,

  attributes: {
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
  	},encryptedPassword:{
      type:'string'
   }

  //    toJSON: function(){
  //     // body...
  //     var obj = this.toObject();
  //     delete obj.password;
  //     delete obj._csrf;
  //     delete obj.encryptedPassword
  //     return obj;
  //   }
   }
};
