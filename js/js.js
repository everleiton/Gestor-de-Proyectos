var proyectonuevo="";
var listaProyectos = [];
var contProyecto = 0;
var ID = 0;
var edicionProyecto="";
var Persister = {
  save: function (key, value) {
    localStorage.setItem(key, value);
  },
  load: function(key, default_value) {
    return localStorage.getItem(key) || default_value;
  },
  saveObj: function(key, value) {
    var json_string = JSON.stringify(value);
    this.save(key, json_string);
  },
  loadObj: function(key, default_value) {
    var json_string = this.load(key, default_value);
    return JSON.parse(json_string);
  }
};

function load_data() {
  
  listaProyectos = Persister.loadObj('listaProyectos', "[]");
  
  $('#listaProyectos').html('');
  for (var i = 0; i < listaProyectos.length; i++) {
    $('.tareas').append(listaProyectos[i].nombre);
    contProyecto++
  }
}

$(document).ready(function() {
  load_data();
  
  VerIdEditable();
  eliminarElemento();
  editarElemento();
  
  $('.tooltipped').tooltip({delay: 50});
  
  $('.modal').modal();
  
  
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 5 // Creates a dropdown of 15 years to control year
  });
  $("#undo").on('click', function(){
    $(this).unbind();
  });
  
  $( "#agregarproyecto" ).on( "click", function() {
    event.preventDefault();
  
    
    
    var nomNuevoPro= document.getElementById("nameProyecto").value;
    var fechaInicio= document.getElementById("dateInicio").value;
    ID = contProyecto +=1;
    proyectonuevo='	  <div class="card objMovible" >	'+
    '<div class="card-content">	'+
    '<div class="texto"><p id="'+ID+ 'editar">'+nomNuevoPro+'</p></div>	'+
    '<div class="iconos">	'+
    '<a href="#modal_editar" class="btn-floating tooltipped btnEditar" data-position="top" data-delay="50" data-tooltip="Editar"><i  id="'+ID+'editar" class="material-icons blue lighten+1">edit</i></a>	'+
    '<a class="btn-floating tooltipped deleteCard" data-position="right" data-delay="50" data-tooltip="Eliminar"><i id="'+(contProyecto -1)+'" class="material-icons blue lighten+1">delete</i></a>	'+
    '	 </div>	'+
    '</div>	'+
    '<div class="card-action">	'+
    '<h6>ID: <strong>'+ID+'</strong><span class="new badge blue lighten+1" data-badge-caption="Personas a cargo">0</span></h6>	'+
    ' <h6>Fecha de Inicio: '+fechaInicio+'</h6>	'+
    '</div>	'+
    '<div class="card-action"> Nuevo | En Proceso |Finali</div>	'+
    '</div>	';
    if ((nomNuevoPro != "") && fechaInicio !="") {
      listaProyectos.push({nombre: proyectonuevo});
      Persister.saveObj('listaProyectos', listaProyectos);
      
      $('.tareas').append(proyectonuevo);
      $('.tooltipped').tooltip({delay: 50});
      editarElemento();
      eliminarElemento();
      VerIdEditable();
      $('#nombreEdicion').val("");
      $('#nameProyecto').val("");
        $('#dateInicio').val("");
    } else {
      $("#nameProyecto").attr("placeholder", "Campo Vacío");
    }
    
    
    
    
  });
  
  
  
  
  
  
  
  
  
  
  
});


function eliminarElemento() {
  
  $( ".deleteCard" ).on( "click", function(e) {
    var id=  e.target.id;
    
var removedItem = listaProyectos.splice(id, 1);
      Persister.saveObj('listaProyectos', listaProyectos);
    alert(id +"-- jaja");
    $(this).parent().parent().parent().slideUp();
  });  
}


function editarElemento() {
  
  $( "#salvarEdicion" ).on( "click", function() {
    
    var nombreNuevo= document.getElementById("nombreEdicion").value;
  
  document.getElementById(edicionProyecto).innerHTML = nombreNuevo;
  
    
  });  
};

function VerIdEditable() {
  
  $( ".btnEditar" ).on( "click", function(e) {
   edicionProyecto=  e.target.id;
    
    
  
    alert(edicionProyecto);
  
  });  
}


