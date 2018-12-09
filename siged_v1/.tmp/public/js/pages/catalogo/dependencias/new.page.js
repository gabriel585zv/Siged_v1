var init = function(){
  
  parasails.registerPage('new', {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
      //…
      formData: {
      },

      // For tracking client-side validation errors in our form.
      // > Has property set to `true` for each invalid property in `formData`.
      formErrors: {

       /* … */ 
     },

      // Syncing / loading state
      syncing: false,

      // Server error state
      cloudError: '',

      // Success state when form has been submitted
      cloudSuccess: false,
    },

    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    beforeMount: function() {
      // Attach any initial data from the server.
      _.extend(this, SAILS_LOCALS);
    },
    mounted: async function() {
      //… 
        $("[id*=salir]").click(function(){           
              window.top.$("#unidad").iziModal("close");
        });
    },

    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods: {
          //…
      submittedForm: async function(result) {
           // Otherwise, redirect to the logged-in dashboard.
          // > (Note that we re-enable the syncing state here.  This is on purpose--
          // > to make sure the spinner stays there until the page navigation finishes.)
          
          if (Object.keys(this.formErrors).length > 0) {
            
            return;

          }else{

            window.parent.iziToast.success({
                title: 'Mensaje del sistema',
                message: 'Se ha creado la nueva Unidad',
            });
            
          }
                  
      },
      closeVentana: function(){

        window.top.$("#unidad").iziModal("close");

      },
      handleParsingForm: function() {
        // Clear out any pre-existing error messages.
        this.formErrors = {};

        var argins = this.formData;

        // Validate clave:
        if(!argins.clave) {
          this.formErrors.clave = true;
        }
        // Validate nombre:
        if(!argins.nombre) {
          this.formErrors.nombre = true;
        }
       
        return argins;
      }
    }
  });

}