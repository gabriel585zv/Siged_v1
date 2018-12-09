module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy dependencias.',


  inputs: {
  	id :{
  		type : 'string',
  		required : true
  	}
  },


  exits: {

  },


  fn: async function (inputs, exits) {
  	var id = inputs.id;

	await dependencia.destroy({id:id}).fetch();
	var response = await dependencia.find();
    sails.sockets.broadcast('room','getDependencia',{response: response});//,req para que lo mande a todos  	
    return this.res.ok();

  }


};
