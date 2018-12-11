module.exports = {


  friendlyName: 'Send password recovery email',


  description: 'Send a password recovery notification to the user with the specified email address.',


  inputs: {

    emailAddress: {
      description: 'The email address of the alleged user who wants to recover their password.',
      example: 'rydahl@example.com',
      type: 'string',
      required: true
    }

  },


  exits: {

    success: {
      description: 'The email address might have matched a user in the database.  (If so, a recovery email was sent.)'
    },

  },


  fn: async function (inputs, exits) {

    // Find the record for this user.
    // (Even if no such user exists, pretend it worked to discourage sniffing.)
    var userRecord = await User.findOne({ emailAddress: inputs.emailAddress });
    if (!userRecord) {
      return exits.success();
    }//•

    // Come up with a pseudorandom, probabilistically-unique token for use
    // in our password recovery email.
    var token = await sails.helpers.strings.random('url-friendly');

    // Store the token on the user record
    // (This allows us to look up the user when the link from the email is clicked.)
    await User.update({ id: userRecord.id }).set({
      passwordResetToken: token,
      passwordResetTokenExpiresAt: Date.now() + sails.config.custom.passwordResetTokenTTL,
    });
      sails.log("USER: "+userRecord.fullName);
      sails.log("LLEGA AQUI!");
      sails.log("email "+inputs.emailAddress);
      sails.log("-: "+token);
    // Send recovery email
    await sails.helpers.sendTemplateEmail.with({
      to: inputs.emailAddress,
      subject: 'Instrucciones para el cambio de contraseña',
      template: 'email-reset-password',
      templateData: {
        fullName: userRecord.fullName,
        token: token
      }
    });

    return exits.success();

  }


};
