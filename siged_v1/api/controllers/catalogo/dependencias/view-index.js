module.exports = {


  friendlyName: 'View index',


  description: 'Display "Index" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/catalogo/dependencias/index'
    }

  },


  fn: async function (inputs, exits) {
    var respuesta = await dependencia.find();
    if(!respuesta){
        respuesta = {};
    }
    // Respond with view.
    return exits.success({response : respuesta});

  }


};
