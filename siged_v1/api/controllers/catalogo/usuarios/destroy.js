module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy usuarios.',


  inputs: {
    id :{
      type : 'string',
      required : true
  },
},

  exits: {

  },


  fn: async function (inputs, exits) {

    var id = inputs.id;
	   await User.update(
      {id: inputs.id}
    ).set({
      estado : false
    });
	  var response = await User.find();
    sails.sockets.broadcast('room','getUsuario',{response: response});//,req para que lo mande a todos
    return this.res.ok();

  },


};
