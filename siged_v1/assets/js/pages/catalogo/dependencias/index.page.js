var init = function(){
var dtDependencia;
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

      dtDependencia = this.initDatatable();
      io.socket.on('getDependencia', function(data) {
        vue.response=data.response;
        dtDependencia.destroy();
        setTimeout(function(){dtDependencia = vue.initDatatable();}, 300);
      });

  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    //…
 initDatatable: function(){
        var dataT;
        dataT = $('#dtDependencia').DataTable({
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

      newGestion : function (){
      var configModal = {
        title: 'Gestionar dependencia',
        subtitle: '',
        headerColor: '#88A0B9',
        background: '#FFFFFF',
        theme: 'dark',
        iframeURL :'./newDependencia',        
      };
      window.top.newModal("unidad",configModal);
    },

    deleteDependencia: function(id){

        iziToast.question({
    timeout: 20000,
    close: false,
    overlay: true,
    displayMode: 'once',
    id: 'question',
    zindex: 999,
    title: 'Mensaje del sistema',
    message: 'Estas segur@ de eliminar el documento?',
    position: 'center',
    buttons: [
        ['<button><b>Si</b></button>', function (instance, toast) {
            
            io.socket.get('/dependencia/destroy/'+id);           
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
 
        }, true],
        ['<button>No</button>', function (instance, toast) {
 
            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
 
        }],
    ]
});

    },
    editDependencia: function(id){
        
        var configModal = {
        title: 'Gestionar dependencia',
        subtitle: 'Actualizar datos',
        headerColor: '#88A0B9',
        background: '#FFFFFF',
        theme: 'dark',
        iframeURL :'./editDependencia?id='+id,        
      };
      window.top.newModal("unidad",configModal);
    }

  }
});

}