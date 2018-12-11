module.exports = {


	friendlyName: 'Google id',


	description: '',


	inputs: {
		id :{
			type : 'string',
			required : true
		},
		emailAddress :{
			type : 'string',
			required : true
		},
	},

	exits: {

	},


	fn: async function (inputs, exits) {


		var id = inputs.id;
		var mail = inputs.emailAddress;
		var meData = await User.findOne({ id: this.req.session.userId });
		var response = false;
		if(meData){

			if(mail == meData.emailAddress){
				
				await User.update(
					{id: this.req.session.userId }
					).set({
						googleId : id
					});

					response = true;

				}else {
					response =false;
				}

			}else{
				response =false;
			}
			return exits.success({ isRegistered : response });
		}


	};
