var proyectonuevo="";
var listaProyectos = [];
var personas=[];
var contPersonas =0;

var contProyecto = 0;
var ID = 0;
var edicionProyecto=0;
var idSeleccionadoEdicion="";
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
  personas = Persister.loadObj('personas', "[]");
  $('#listaProyectos').html('');
  for (var i = 0; i < listaProyectos.length; i++) {
    if (listaProyectos[i] != null) {
      dibujarCargados(listaProyectos[i].id, listaProyectos[i].nombre, listaProyectos[i].fecha, listaProyectos[i].encargados, listaProyectos[i].idBoton);
    }
  }
  
  contProyecto=  listaProyectos.length;
  
}

function loadPersonas() {
  for (var i = 0; i < personas.length; i++) {
    
    $('#seleccionPersona').append('<option value="'+personas[i].nombre+'" data-icon="images/person.png" class="left circle">'+personas[i].nombre+'</option>');
    $('select').material_select();
    
  }
  contPersonas=personas.length;
  
}

$(document).ready(function() {
  $('.tooltipped').tooltip({delay: 50});
  load_data();
  loadPersonas();
  VerIdEditable();
  eliminarElemento();
  editarElemento();
  AgregarTarea();
  VerIdCant();
  
  
  
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
    var nomP = document.getElementById("nuevaPersona").value;
    if (nomP.length >1) {
      contPersonas+=1;
      personas.push({id: contPersonas, nombre: nomP, cantidadTareas: 1});
      Persister.saveObj('personas', personas);
      $('#seleccionPersona').append('<option value="'+nomP+'" data-icon="images/person.png" class="left circle">'+nomP+'</option>');
      document.getElementById("nuevaPersona").value = "";
      $('select').material_select();
      document.getElementById("nuevaPersona").value ="";
      Materialize.toast('Persona añadida exitosamente <br> Seleccionela en la lista.', 10000);
    }else{
      Materialize.toast('Debe ingresar un nombre para poder agregar.', 10000);
    }
  });
  
  
  $( "#agregarproyecto" ).on( "click", function() {
    event.preventDefault();
    var nomNuevoPro= document.getElementById("nameProyecto").value;
    var fechaInicio= document.getElementById("dateInicio").value;
    ID = contProyecto +1;
    idBoton= contProyecto; //Revisar este
    if ((nomNuevoPro != "") && fechaInicio !="") {
      dibujarProyectos(nomNuevoPro, fechaInicio, ID, 0, idBoton);
      $('#nombreEdicion').val("");
      $('#nameProyecto').val("");
      $('#dateInicio').val("");
      Materialize.toast('Proyecto agregado exitosamente!.', 10000);
    } else {
      
      Materialize.toast('Ops!! Ha ocurrido un error <br><br> Debe asignarle un nombre y/o fecha <br> al proyecto para poderlo agregar.', 10000);
      $("#nameProyecto").attr("placeholder", "");
    }
  });
});

/*
//////////////Método para dibujar las tareas//////////////
*/
function AgregarTarea() {  
  $( "#btnAddTarea" ).on( "click", function(e) {
    var tarea= document.getElementById("nameTarea").value;
    var combo = document.getElementById('seleccionPersona');
    if(combo.selectedIndex<0){
      
      alert('No hay opción seleccionada');
    }
    else{
      var seleccion =combo.options[combo.selectedIndex].value;
    }
    $('#nueva').append('<div draggable="true" id="tarea1" ondragstart="drag(event)" data-position="top" data-delay="80" data-tooltip="'+tarea+ '  | Encargado de la tarea: '+seleccion+'" class="cuadritoTarea tooltipped">'+tarea+'</div>');
    $('.tooltipped').tooltip({delay: 50});
    
    
  }); 
}

/*
//////////////Método para Dibujar los proycetos en pantalla//////////////
*/
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
  '<div class="card-action tareas2"><div class="columnaTarea"><div draggable="false" class="tituloEstado"><h6>Nueva tarea '+
      '<a  id="tarea'+id+'"href="#modal_tarea" id="btnNueva" class="btn-floating btn-tiny tooltipped" data-position="top" data-delay="80" data-tooltip="Agregar Tarea"><i id="'+id+'"class="material-icons tiny blue lighten+1">add</i></a></h6></div><div id="nueva" ondrop="drop(event)" ondragover="allowDrop(event)"class="areaTareas"></div></div>'+
        '<div class="columnaTarea"> <div draggable="false" class="tituloEstado"> <h6>En proceso </h6></div>'+
        '<div id="enProceso" ondrop="drop(event)" ondragover="allowDrop(event)" class="areaTareas"></div></div>'+
        '<div class="columnaTarea"><div draggable="false" class="tituloEstado"><h6>Finalizada</h6></div>'+
        '<div id="finalizado" ondrop="drop(event)" ondragover="allowDrop(event)" class="areaTareas"></div></div></div>	'+
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
    alert(listaProyectos[edicionProyecto].nombre);
    var nombreNuevo= document.getElementById("nombreEdicion").value;
    document.getElementById(idSeleccionadoEdicion).innerHTML = nombreNuevo;
    listaProyectos[edicionProyecto].nombre = nombreNuevo;
    var nuevoArreglo =(JSON.stringify(listaProyectos));
    localStorage.setItem('listaProyectos', nuevoArreglo);
  });  
};

function VerIdEditable() {
  $( ".btnEditar" ).on( "click", function(e) {
    idSeleccionadoEdicion=  e.target.id;
    idTargeta = idSeleccionadoEdicion.substr(-10,1);
    edicionProyecto =(idTargeta -1);
    document.getElementById("nombreEdicion").value =listaProyectos[edicionProyecto].nombre;
    $("#iconoEdicion").addClass("active");
    $( "#nombreEdicion" ).focus();
  });  
}

function VerIdCant() {
  $( ".btnNueva" ).on( "click", function(e) {
    idEditador=  e.target.id;
    alert(idEditador);
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
  '<div class="card-action tareas2"><div class="columnaTarea"><div draggable="false" class="tituloEstado"><h6>Nueva tarea '+
      '<a id="tarea'+id+'" href="#modal_tarea" id="btnNueva" class="btn-floating btn-tiny tooltipped" data-position="top" data-delay="80" data-tooltip="Agregar Tarea"><i id="'+id+'"class="material-icons tiny blue lighten+1">add</i></a></h6></div><div id="nueva_1" ondrop="drop(event)" ondragover="allowDrop(event)"class="areaTareas"></div></div>'+
        '<div class="columnaTarea"> <div draggable="false" class="tituloEstado"> <h6>En proceso </h6></div>'+
        '<div id="enProceso" ondrop="drop(event)" ondragover="allowDrop(event)" class="areaTareas"></div></div>'+
        '<div class="columnaTarea"><div draggable="false" class="tituloEstado"><h6>Finalizada</h6></div>'+
        '<div id="finalizado" ondrop="drop(event)" ondragover="allowDrop(event)" class="areaTareas"></div></div></div>	'+
  '</div>	';
  $('.tareas').append(proyecto);
  $('.tooltipped').tooltip({delay: 50});
  editarElemento();
  eliminarElemento();
  VerIdEditable();
  AgregarTarea();
}