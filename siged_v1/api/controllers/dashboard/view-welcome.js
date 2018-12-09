module.exports = {


  friendlyName: 'View welcome page',


  description: 'Display the dashboard "Welcome" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/welcome',
      description: 'Display the welcome page for authenticated users.'
    },

  },


  fn: async function (inputs, exits) {

    //= 
   // var data = await Plantilla.find({ autor : this.req.session.userId });
    //console.log(data);
    var query = 'SELECT p.id, p.titulo, p.titulo as doc, p.plantilla, p.version, p.publico, p.autor, (SELECT d.nombre from dependencia d where d.id= p.dependencia) as dependencia FROM Plantilla p where autor='+this.req.session.userId;
    var misDocumentos;
    await Plantilla.getDatastore().sendNativeQuery(query,function(err, results) {      
      if(results!=undefined){
        misDocumentos = results.rows;     
      }else{
        misDocumentos = { };
        sails.log("Err: resultados plantilla");
      }
      return exits.success({ response : misDocumentos });
    });   
    
  }


};
