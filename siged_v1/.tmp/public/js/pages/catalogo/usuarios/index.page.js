var init = function(){
var dtusuario;
var vue = parasails.registerPage('index', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…

    response : [],
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

      dtusuario = this.initDatatable();
      io.socket.on('getUsuario', function(data) {
        vue.response=data.response;
        dtusuario.destroy();
        setTimeout(function(){dtusuario = vue.initDatatable();}, 300);
      });

  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    //…
  initDatatable: function(){
        var dataT;
        dataT = $('#dtUsuarios').DataTable({
         responsive: true,
         "columnDefs": [{
           "targets": [1,2,3],
           "orderable": false
         }],
         "language": {
          "lengthMenu": "Documentos por página _MENU_",
          "zeroRecords": "No se han encontrado documentos",
          "info": "Página _PAGE_ de _PAGES_",
          "infoEmpty": "No hay documentos disponibles",
          "infoFiltered": "(Filtrado de _MAX_ documentos en total)",
          "processing": "Cargando...",
          "search":"",
          "paginate": {
            "first":      "Primero",
            "last":       "Último",
            "next":       "Siguiente",
            "previous":   "Anterior"
          }
        }
      });
        return dataT;
      },
      newUser : function (){
          var configModal = {
          title: 'Gestionar usuario',
          subtitle: '',
          headerColor: '#88A0B9',
          background: '#FFFFFF',
          theme: 'dark',
          iframeURL :'./newUser',        
        };
        window.top.newModal("usuario",configModal);        
      },
      bloqueaUsuario : function(id){
      //deleteDependencia: function(id){  
        //Por favor se trata de reutilizar  esto no se hace! se debe cambiar el nombre de las funciones
        //Se debe generar codigo limpio 
          iziToast.question({
          timeout: 20000,
          close: false,
          overlay: true,
          displayMode: 'once',
          id: 'question',
          zindex: 999,
          title: 'Mensaje del sistema',
          message: 'Estas segur@ de inhabilitar el usuario?',
          position: 'center',
          buttons: [
              ['<button><b>Si</b></button>', function (instance, toast) {

                  io.socket.get('/usuarios/destroy/'+id);
                  instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

              }, true],
              ['<button>No</button>', function (instance, toast) {

                  instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

              }],
          ]
      });

    },
     desbloqueaUsuario : function(id){
      //deleteDependencia: function(id){  
        //Por favor se trata de reutilizar  esto no se hace! se debe cambiar el nombre de las funciones
        //Se debe generar codigo limpio 
          iziToast.question({
          timeout: 20000,
          close: false,
          overlay: true,
          displayMode: 'once',
          id: 'question',
          zindex: 999,
          title: 'Mensaje del sistema',
          message: 'Estas segur@ de devolver el acceso al usuario?',
          position: 'center',
          buttons: [
              ['<button><b>Si</b></button>', function (instance, toast) {

                  io.socket.get('/usuarios/active/'+id);
                  instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

              }, true],
              ['<button>No</button>', function (instance, toast) {

                  instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

              }],
          ]
      });

    }


  }
});
}
