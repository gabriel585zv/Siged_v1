var init = function(){
 var vue=parasails.registerPage('account-overview', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    isBillingEnabled: false,

    hasBillingCard: false,

    // Syncing/loading states for this page.
    syncingOpenCheckout: false,
    syncingUpdateCard: false,
    syncingRemoveCard: false,

    // Form data
  formData: { /* … */ },

    // Server error state for the form
    cloudError: '',

    // For the Stripe checkout window
    checkoutHandler: undefined,

    // For the confirmation modal:
    removeCardModalVisible: false,
    isFirst : false,
    isRegistered :false,
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function (){

    _.extend(this, window.SAILS_LOCALS);

    this.isBillingEnabled = !!this.stripePublishableKey;

    // Determine whether there is billing info for this user.
    this.me.hasBillingCard = (
      this.me.billingCardBrand &&
      this.me.billingCardLast4 &&
      this.me.billingCardExpMonth &&
      this.me.billingCardExpYear
      );
  },
  mounted: async function() {
    //…
   // this.loadGoogle(vue.isFirst); 
   gapi.signin2.render('gSignIn', {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': function(user) {
      gapi.auth2.getAuthInstance().disconnect();
      if(vue.isRegistered){
        $("[id*=not_signed]").html('Actualizar google ID');
        $("[id*=connected]").html('Actualizar google ID');
      }else{
        $("[id*=not_signed]").html('Setear google ID');
        $("[id*=connected]").html('Setear google ID');             
      }  

      if(vue.isFirst){
       var profile = user.getBasicProfile();
       console.log(profile.getEmail());
       $.ajax({
        url: "/setIdgoogle",
        data:{
          id: profile.getId(),
          emailAddress: profile.getEmail(),
        },
        success: function(data){                   
          if(data.isRegistered){
            vue.isRegistered = data.isRegistered;
            iziToast.success({
              title: 'Mensaje del Sistema',
              message: 'ID de google registrado con éxito!.',
            });
          }else{
            iziToast.error({
              title: 'Mensaje del Sistema',
              message: 'Ha ocurrido un error al procesar su solicitud.',
            });
          }
        }
      }); 
     }else{
      vue.isFirst = true;
    }

  },
  'onfailure':function(err) {
    console.log('Google signIn2.render button err: ' + err);
  }           
});


 },
  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    isGoogle : function(){
     var mail = this.me.emailAddress;              

     if(mail.split("@")[1] == "gmail.com"){
      return true;
    }else{
      return false;
    }
  }

}
});
}