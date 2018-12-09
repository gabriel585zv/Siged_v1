module.exports = {


  friendlyName: 'View index',


  description: 'Display "Index" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/catalogo/usuarios/index'
    }

  },


  fn: async function (inputs, exits) {
    var respuesta = await User.find();
    if(!respuesta){
        respuesta = {};
    }
    // Respond with view.
    return exits.success({response : respuesta});

  }


};
