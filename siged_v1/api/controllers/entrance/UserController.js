/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 module.exports = {

 	subscribe: function(req, res){

 		if (req.isSocket) {
 			//sails.sockets.getId(req) 	
 			sails.sockets.join(req, 'room');  		
 			sails.log("SOCKET CONNECTED IP: "+req.ip);	 			
 		}
 		res.ok();
 	},

 	userConected : function(req, res){
		sails.log(req.ip + "SOCKET ID UserController : "+sails.sockets.getId(req));	
        sails.sockets.broadcast('room', 'welcome', { message: 'Hi! '+req.me.fullName +' is now logged!'},req); 		
 		res.ok();
 	}
    

 };

