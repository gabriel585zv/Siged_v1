module.exports = {


  friendlyName: 'View new',


  description: 'Display "New" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/plantilla/new'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    var dependencias = await dependencia.find();
    return exits.success({response : dependencias});

  }


};
