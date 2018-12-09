/**
 * GoogleController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
 
  validar: async function (req, res) {
  	var email = req.param("emailAddress"); // CORREO ELECTRONICO DE GOOGLE 
  	var photo = req.param("photo"); //UR FOTO EN GOOGLE
  	var Id = req.param("Id"); // ID DEL PERFIL EN GOOGLE
  	var respuesta = "";
    var userRecord = await User.findOne({
      emailAddress: email.toLowerCase(),
    });
    // If there was no matching user, respond thru the "badCombo" exit.
    if(!userRecord) {
      respuesta = "Estimado usuario usted no ha sido autenticado, vuelva a intentarlo gracias.";
    }else{ 
       // if(userRecord.googleId === Id ){
		    req.session.userId = userRecord.id;
		    req.session.photo = photo;   
		    respuesta = ""; 
		/*}else{
			respuesta = "Estimado usuario usted no se encuentra registrado en el sistema con cuenta de google, por favor contacte a soporte!";
		}*/
    }
    return res.json({response:respuesta});

  }

};

