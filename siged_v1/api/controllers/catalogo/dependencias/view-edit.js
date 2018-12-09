module.exports = {


  friendlyName: 'View edit',


  description: 'Display "Edit" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/catalogo/dependencias/edit'
    }

  },

  inputs: {
    id :{
      type : 'string',
      required : true
    }
  },
  
  fn: async function (inputs, exits) {

    // Respond with view.
    var response = await dependencia.findOne({ id : inputs.id });
    return exits.success({ formData : response });

  }


};
