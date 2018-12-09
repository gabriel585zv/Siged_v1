/**
 * cloud.setup.js
 *
 * Configuration for this Sails app's generated browser SDK ("Cloud").
 *
 * Above all, the purpose of this file is to provide endpoint definitions,
 * each of which corresponds with one particular route+action on the server.
 *
 * > This file was automatically generated.
 * > (To regenerate, run `sails run rebuild-cloud-sdk`)
 */

Cloud.setup({

  /* eslint-disable */
  methods: {"confirmEmail":{"verb":"GET","url":"/email/confirm","args":["token"]},
  "logout":{"verb":"GET","url":"/api/v1/account/logout","args":[]},
  "updatePassword":{"verb":"PUT","url":"/api/v1/account/update-password","args":["password"]},
  "updateProfile":{"verb":"PUT","url":"/api/v1/account/update-profile","args":["fullName","emailAddress"]},
  "updateBillingCard":{"verb":"PUT","url":"/api/v1/account/update-billing-card","args":["stripeToken",
  "billingCardLast4","billingCardBrand","billingCardExpMonth","billingCardExpYear"]},
  "login":{"verb":"PUT","url":"/api/v1/entrance/login","args":["emailAddress","password","rememberMe"]},
  "signup":{"verb":"POST","url":"/api/v1/entrance/signup","args":["emailAddress","password","fullName","isSuperAdmin"]},
  "sendPasswordRecoveryEmail":{"verb":"POST","url":"/api/v1/entrance/send-password-recovery-email","args":["emailAddress"]},
  "updatePasswordAndLogin":{"verb":"POST","url":"/api/v1/entrance/update-password-and-login","args":["password","token"]},
  "deliverContactFormMessage":{"verb":"POST","url":"/api/v1/deliver-contact-form-message","args":["emailAddress","topic","fullName","message"]},
  "createUnidad":{"verb":"POST","url":"/api/v1/catalogo/dependencias/create","args":["clave","nombre"]},
  "editUnidad":{"verb":"POST","url":"/api/v1/catalogo/dependencias/edit","args":["clave","nombre"]},
  "destroyDep":{"verb":"POST","url":"/api/v1/catalogo/dependencias/destroy","args":["id"]},
  "newPlantilla":{"verb":"POST","url":"/api/v1/plantilla/new","args":["titulo","dependencia","plantilla"]},
  "newUser":{"verb":"POST","url":"/api/v1/catalogo/usuarios/create-user","args":["emailAddress","password","fullName","isSuperAdmin"]},
  
}
  /* eslint-enable */

});
