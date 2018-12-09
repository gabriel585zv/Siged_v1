module.exports = {


  friendlyName: 'New',


  description: 'New plantilla.',


  inputs: {

  	plantilla : {
  		type : 'string'
  	},
  	titulo : {
  		type : 'string'
  	},

  	dependencia: {
        type : 'string'
    },

  },


  exits: {
  	success : {
        outputDescription : '',
        outputType: {
          reponse : 'json'
        }
  	}
  },


  fn: async function (inputs, exits) {

   	var registro = await Plantilla.create(Object.assign({
  		titulo : inputs.titulo,
  		plantilla: inputs.plantilla,
  		dependencia : inputs.dependencia,
  		autor : this.req.session.userId,
      	modificadoPor : this.req.session.userId
  	}));

  	if(!registro){
  		registro = [];
  	}
     /// NODEJS RESPONSE AL ROOM
    var response = await Plantilla.find(); 
    var data = {
      response : response,
      id : this.req.session.userId
    }
    sails.sockets.broadcast('room','getMisdocumentos',{ response: data });//,req para que lo mande a todos    

  	return exits.success( { registro : registro });

  }

};
