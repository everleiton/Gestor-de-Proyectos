var proyectonuevo="";
var listaProyectos = [];
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
	}
}

$(document).ready(function() {
  load_data();

  
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
        var ID= Math.random().toString(36).substr(2, 4);
        proyectonuevo='	  <div class="card" >	'+
        '<div class="card-content objMovible">	'+
        '<div class="texto"><p id="proyecto_234"class="'+ID+'">'+nomNuevoPro+'</p></div>	'+
        '<div class="iconos">	'+
        '<a id="proyecto_234" href="#modal_editar"class="btn-floating tooltipped proyecto_234" data-position="top" data-delay="50" data-tooltip="Editar"><i class="material-icons blue lighten+1">edit</i></a>	'+
        '<a class="btn-floating tooltipped deleteCard" data-position="right" data-delay="50" data-tooltip="Eliminar"><i class="material-icons blue lighten+1">delete</i></a>	'+
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
      } else {
          $("#nameProyecto").attr("placeholder", "Campo Vacío");
      }
    
    
  
    
  });
  
  
  
  
  
  
  
  
  
  
  
});


function eliminarElemento() {
  
  $( ".deleteCard" ).on( "click", function() {
    $(this).parent().parent().parent().slideUp();
    
  });  
}


function editarElemento() {
  
  $( "#salvarEdicion" ).on( "click", function() {
    var nombre= document.getElementById("nombreEdicion").value;
    document.getElementById("proyecto_234").innerHTML = nombre;
    $('#nombreEdicion').val("");
    
  });  
}