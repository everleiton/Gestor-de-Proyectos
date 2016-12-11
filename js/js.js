var proyectonuevo="";
var listaProyectos = [];
var personas=[];


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

/////////////////////////////////
//////////cuando cargue las personas y agrege al select debo agregar
///////////////////  $('select').material_select();
///////////////////


function load_data() {
  listaProyectos = Persister.loadObj('listaProyectos', "[]");
  $('#listaProyectos').html('');
  for (var i = 0; i < listaProyectos.length; i++) {
    if (listaProyectos[i] != null) {
      dibujarCargados(listaProyectos[i].id, listaProyectos[i].nombre, listaProyectos[i].fecha, listaProyectos[i].encargados, listaProyectos[i].idBoton);
}
}
contProyecto=  listaProyectos.length;

}

$(document).ready(function() {
  load_data();
  
  VerIdEditable();
  eliminarElemento();
  editarElemento();
  
  $('.tooltipped').tooltip({delay: 50});
  
  $('.modal').modal();
      $('select').material_select();

  
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 3
  });
  
  $("#undo").on('click', function(){
    $(this).unbind();
  });
          $("#addCombo").on('click', function(){
              $('#seleccionPersona').append('<option value="" data-icon="images/person.png" class="left circle">example 4</option>');
              $('select').material_select();
          });
  
  $( "#agregarproyecto" ).on( "click", function() {
    event.preventDefault();
    
    
    /*
    Guardar los datos como objetos para que cuando cargue sea un mismo var que se le van asiganando los proyectos
    lo que voy a guardar son variables  lo que me permitirá modificar por obj.nom o lo que sea
    cuando los agarro recorro 2 for uno con la lsta de priyecto y otro que me reforre el listado de atributps de la tarea   podria ser tarea[ ]
    
    */

    var nomNuevoPro= document.getElementById("nameProyecto").value;
    var fechaInicio= document.getElementById("dateInicio").value;
    ID = contProyecto +1;
    idBoton= contProyecto; //Revisar este
    
  
    if ((nomNuevoPro != "") && fechaInicio !="") {
      
      dibujarProyectos(nomNuevoPro, fechaInicio, ID, 0, idBoton);
    
      $('#nombreEdicion').val("");
      $('#nameProyecto').val("");
      $('#dateInicio').val("");
    } else {
      $("#nameProyecto").attr("placeholder", "Campo Vacío");
    }
    
    
    
    
  });
  
  
  
  
});


function dibujarProyectos(nombre, fecha, id,personasencargadas, idBoton) {
  proyectonuevo='	  <div class="card objMovible" >	'+
  '<div class="card-content">	'+
  '<div class="texto"><p id="'+id+ 'editar">'+nombre+'</p></div>	'+
  '<div class="iconos">	'+
  '<a href="#modal_editar" class="btn-floating tooltipped btnEditar" data-position="top" data-delay="50" data-tooltip="Editar"><i  id="'+id+'editar" class="material-icons blue lighten+1">edit</i></a>	'+
  '<a class="btn-floating tooltipped deleteCard" data-position="right" data-delay="50" data-tooltip="Eliminar"><i id="'+ idBoton+'" class="material-icons blue lighten+1">delete</i></a>	'+
  '	 </div>	'+
  '</div>	'+
  '<div class="card-action">	'+
  '<h6>ID: <strong>'+ID+'</strong><span class="new badge blue lighten+1" data-badge-caption="Personas a cargo">'+personasencargadas+'</span></h6>	'+
  ' <h6>Fecha de Inicio: '+fecha+'</h6>	'+
  '</div>	'+
  '<div class="card-action"> Nuevo | En Proceso |Finali</div>	'+
  '</div>	';
  listaProyectos.push({id: id,nombre: nombre, fecha: fecha, encargados: personasencargadas, idBoton: idBoton});
  Persister.saveObj('listaProyectos', listaProyectos);
  $('.tareas').append(proyectonuevo);
  
  $('.tooltipped').tooltip({delay: 50});
  editarElemento();
  eliminarElemento();
  VerIdEditable();
}


function eliminarElemento() {
  
  $('#listaProyectos').html('');
  $( ".deleteCard" ).on( "click", function(e) {
    var idDelete =  e.target.id;

  
  
listaProyectos.splice(idDelete,1);
    var nuevoArreglo =(JSON.stringify(listaProyectos));
    localStorage.setItem('listaProyectos', nuevoArreglo);
    
		load_data();
    

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


/*
function findAndRemove(array, property, value) {
  array.forEach(function(result, index) {
    if(result[property] === value) {
      //Remove from array
      array.splice(index, 1);
    }    
  });
}

//Checks countries.result for an object with a property of 'id' whose value is 'AF'
//Then removes it ;p
findAndRemove(countries.results, 'id', 'AF');




*/
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
/////////////////////////////OIR AUDIO//
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

function dibujarCargados( id,nombre, fecha,personasencargadas, idBoton) {
  var proyecto='	  <div class="card objMovible" >	'+
  '<div class="card-content">	'+
  '<div class="texto"><p id="'+id+ 'editar">'+nombre+'</p></div>	'+
  '<div class="iconos">	'+
  '<a href="#modal_editar" class="btn-floating tooltipped btnEditar" data-position="top" data-delay="50" data-tooltip="Editar"><i  id="'+id+'editar" class="material-icons blue lighten+1">edit</i></a>	'+
  '<a class="btn-floating tooltipped deleteCard" data-position="right" data-delay="50" data-tooltip="Eliminar"><i id="'+idBoton+'" class="material-icons blue lighten+1">delete</i></a>	'+
  '	 </div>	'+
  '</div>	'+
  '<div class="card-action">	'+
  '<h6>ID: <strong>'+id+'</strong><span class="new badge blue lighten+1" data-badge-caption="Personas a cargo">'+personasencargadas+'</span></h6>	'+
  ' <h6>Fecha de Inicio: '+fecha+'</h6>	'+
  '</div>	'+
  '<div class="card-action"> Nuevo | En Proceso |Finali</div>	'+
  '</div>	';

  $('.tareas').append(proyecto);
  
  $('.tooltipped').tooltip({delay: 50});
  editarElemento();
  eliminarElemento();
  VerIdEditable();
}