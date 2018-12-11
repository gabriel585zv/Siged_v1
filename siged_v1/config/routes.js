/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
  'GET /':                   { action: 'view-homepage-or-redirect' },

  'GET /welcome':            { action: 'dashboard/view-welcome' ,  locals: { layout: 'layouts/layoutDashboard'} },
  'GET /dependencias': { action: 'catalogo/dependencias/view-index',  locals: { layout: 'layouts/layoutDashboard'} },
  'GET /newDependencia': { action: 'catalogo/dependencias/view-new',  locals: { layout: 'layouts/layoutModal'} },
  'GET /editDependencia': { action: 'catalogo/dependencias/view-edit',  locals: { layout: 'layouts/layoutModal'} },
  'GET /indexUsuarios': { action: 'catalogo/usuarios/view-index' ,  locals: { layout: 'layouts/layoutDashboard'} },
  'GET /newPlantilla': { action: 'plantilla/view-new' ,  locals: { layout: 'layouts/layoutModal'} }, 

  'GET /faq':                { view:   'pages/faq' },
  'GET /legal/terms':        { view:   'pages/legal/terms' },
  'GET /legal/privacy':      { view:   'pages/legal/privacy' },
  'GET /contact':            { view:   'pages/contact' },

  'GET /signup':             { action: 'entrance/view-signup' },
  'GET /newUser' :           { action: 'catalogo/usuarios/view-new' ,  locals: { layout: 'layouts/layoutModal'} }, 
  'GET /email/confirm':      { action: 'entrance/confirm-email' },
  'GET /email/confirmed':    { view:   'pages/entrance/confirmed-email' },


  'GET /login':              { action: 'entrance/view-login' },
  'GET /password/forgot':    { action: 'entrance/view-forgot-password' },
  'GET /password/new':       { action: 'entrance/view-new-password' },

  'GET /account':            { action: 'account/view-account-overview' ,  locals: { layout: 'layouts/layoutDashboard'} },
  'GET /account/password':   { action: 'account/view-edit-password' ,  locals: { layout: 'layouts/layoutDashboard'} },
  'GET /account/profile':    { action: 'account/view-edit-profile' ,  locals: { layout: 'layouts/layoutDashboard'} },

  'GET /user/subscribe': 'entrance/UserController.subscribe',
  'GET /user/conected': 'entrance/UserController.userConected',

  'GET /setIdgoogle': { action: 'catalogo/usuarios/google-id' },
  'GET /logle': 'entrance/GoogleController.validar',
  'GET /dependencia/destroy/:id': { action: 'catalogo/dependencias/destroy' },
  'GET /usuarios/destroy/:id': { action: 'catalogo/usuarios/destroy' },
  'GET /usuarios/active/:id': { action: 'catalogo/usuarios/active' },
  

  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the CloudSDK library.
  '/api/v1/account/logout':                           { action: 'account/logout' },
  'PUT   /api/v1/account/update-password':            { action: 'account/update-password' },
  'PUT   /api/v1/account/update-profile':             { action: 'account/update-profile' },
  'PUT   /api/v1/account/update-billing-card':        { action: 'account/update-billing-card' },
  'PUT   /api/v1/entrance/login':                        { action: 'entrance/login' },
  'POST  /api/v1/entrance/signup':                       { action: 'entrance/signup' },
  'POST  /api/v1/catalogo/usuarios/create-user':              { action: 'catalogo/usuarios/create-user' },
  'POST  /api/v1/entrance/send-password-recovery-email': { action: 'entrance/send-password-recovery-email' },
  'POST  /api/v1/entrance/update-password-and-login':    { action: 'entrance/update-password-and-login' },
  'POST  /api/v1/deliver-contact-form-message':          { action: 'deliver-contact-form-message' },
  


  //NUEVOS ACTIONS
  'POST /api/v1/catalogo/dependencias/create': { action: 'catalogo/dependencias/create' },
  'POST /api/v1/catalogo/dependencias/edit': { action: 'catalogo/dependencias/edit' },

  'POST /api/v1/plantilla/new': { action: 'plantilla/new' },

  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝
  '/terms':                   '/legal/terms',
  '/logout':                  '/api/v1/account/logout',

};
