var init = function(){
 var dtMisdocumentos;
 var vue = parasails.registerPage('welcome', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    dashboardModalVisible: false,
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

    dtMisdocumentos = this.initDatatable();
    io.socket.on('getMisdocumentos', function(data) {      
      if(Number(data.response.id) == Number($("#userId").val())){
        vue.response=data.response.response;        
        dtMisdocumentos.destroy();
        setTimeout(function(){dtMisdocumentos = vue.initDatatable();}, 300);
      }
    });

  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

   initDatatable: function(){
    var dataT;
    var groupColumn = 0;
    dataT = $('#misDocumentos').DataTable({
     responsive: true,
     "columnDefs": [
        { "visible": false , "targets": groupColumn }
     ],
     "order": [[ groupColumn, 'asc' ]],
        "displayLength": 10,
        "drawCallback": function ( settings ) {
            var api = this.api();
            var rows = api.rows( {page:'current'} ).nodes();
            var last=null;
 
            api.column(groupColumn, {page:'current'} ).data().each( function ( group, i ) {
                if ( last !== group ) {
                    $(rows).eq( i ).before(
                        '<tr class="group"><td colspan="7" Style="color:blue;"><font size="3">'+group+'</></td></tr>'
                    );
 
                    last = group;
                }
            } );
      },
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

  $('#misDocumentos tbody').on( 'click', 'tr.group', function () {
        var currentOrder = table.order()[0];
        if ( currentOrder[0] === groupColumn && currentOrder[1] === 'asc' ) {
            table.order( [ groupColumn, 'desc' ] ).draw();
        }
        else {
            table.order( [ groupColumn, 'asc' ] ).draw();
        }
    } ); 
    return dataT;
  },
  newGestion : function (){
    var configModal = {
      title: 'Gestionar documento',
      subtitle: '',
      headerColor: '#88A0B9',
      background: null,
      theme: 'dark',
      iframeURL :'./newPlantilla',        
    };
    window.top.newModal("gestion",configModal);


  }

  ,clickOpenDashboardModalButton: async function() {
    this.dashboardModalVisible = true;
  },

  closeDashboardModal: async function() {
    this.dashboardModalVisible = false;
  },

}
});
}