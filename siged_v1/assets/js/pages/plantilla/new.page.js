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

      response : [],

      registro : [],

    },

    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    beforeMount: function() {
      // Attach any initial data from the server.
      _.extend(this, SAILS_LOCALS);
    },
    mounted: async function() {


      //Llamo funcion para el editor
      $("[id*=txtEditor]").Editor();    
      $("[id*=salir]").click(function(){      

        window.top.$("#gestion").iziModal("close");


      });
    },

    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods: {
          //…
          HtmlToPdf : function() {
            var html ="<body>HOLA MUNDO</body>";
            var endpoint = 'https://v2018.api2pdf.com/chrome/html';
            var apikey = 'a164079a-857f-4f66-9f7c-def3b7154c07'; //api key id
            var payload = {
              "html": html,
              "inlinePdf": false
            };
            $.ajax({
              url: endpoint,
              method: "POST",
              dataType: "json",
              crossDomain: true,
              contentType: "application/json; charset=utf-8",
              data: JSON.stringify(payload),
              cache: false,
              beforeSend: function (xhr) {
                /* Authorization header */
                xhr.setRequestHeader("Authorization", apikey);                   
              },
              success: function (data) {
                window.location.href=data.pdf;                    
              },
              error: function (jqXHR, textStatus, errorThrown) {

              }
            });
          },

          submittedForm: async function(result) {
           // Otherwise, redirect to the logged-in dashboard.
          // > (Note that we re-enable the syncing state here.  This is on purpose--
          // > to make sure the spinner stays there until the page navigation finishes.)
          
          if (Object.keys(this.formErrors).length > 0) {

            return;

          }else{

            window.parent.iziToast.success({
              title: 'Mensaje del sistema',
              message: 'Se ha incluido la nueva plantilla!.',
            });
            
          }

        },
        closeVentana: function(){

          window.top.$("#gestion").iziModal("close");

        },
        handleParsingForm: function() {
        // Clear out any pre-existing error messages.
          this.formErrors = {};

          var argins = this.formData;

          argins.plantilla = $("#txtEditor").Editor("getText");
          // Validate clave:
          if(!argins.titulo) {
            this.formErrors.titulo = true;
          }
          // Validate nombre:
          if(!argins.dependencia) {
            this.formErrors.dependencia = true;
          }

          if(!argins.plantilla){
            this.formErrors.plantilla=true;
          }
         
          return argins;
      }
    }
  });

}


