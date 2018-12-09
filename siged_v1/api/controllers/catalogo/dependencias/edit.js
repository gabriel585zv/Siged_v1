module.exports = {


  friendlyName: 'Edit',


  description: 'Edit dependencias.',


  inputs: {
  	id : {
  		type : 'string'
  	},
  	homoclave: {
  		type: 'string'
  	},
  	nombre : {
  		type: 'string'
  	}

  },

  exits: {
  	success : {
        outputDescription : '',
        outputType: {
          response : 'json'
        }
  	}

  },

  fn: async function (inputs, exits) {
  	var id = inputs.id;
    var clave = inputs.homoclave;
    var nombre = inputs.nombre;
    var response = await dependencia.update(
      {id: inputs.id}
    ).set({
	  homoclave: clave,
      nombre : nombre,
      autor : this.req.session.userId,
      modificadoPor : this.req.session.userId    	
    });

    var response = await dependencia.find();
    sails.sockets.broadcast('room','getDependencia',{response: response});//,req para que lo mande a todos    
    return this.res.ok();

  }


};
