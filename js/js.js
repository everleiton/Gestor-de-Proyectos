
$(document).ready(function() {
  eliminarElemento();

  $('.tooltipped').tooltip({delay: 50});
  
  $('.modal').modal();
  

  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });
  $("#undo").on('click', function(){
    $(this).unbind();
  });
  
  $( "#agregarproyecto" ).on( "click", function() {
    $('.tareas').append('<div class="card fdv" ><div class="card-content">'+
            '<div class="texto"><p class="flow-text">Proyecjnjknkjnto Web I</p></div>'+
            '<div class="iconos">'+
            '  <a id="editCard"class="btn-floating tooltipped" data-position="top" data-delay="50" data-tooltip="Editar"><i class="material-icons blue '+ 'lighten+1">edit</i></a>'+
            '  <a class="btn-floating tooltipped deleteCard" data-position="right" data-delay="50" data-tooltip="Eliminar"><i class="material-icons blue '+ 'lighten+1">delete</i></a>'+
          '  </div></div><div class="card-action"> Nuevo | En Proceso |Finali</div></div>');
    $('.tooltipped').tooltip({delay: 50});
    eliminarElemento();
  });
  

  
  
  
  
  
  
  
});

function eliminarElemento() {
  $( ".deleteCard" ).on( "click", function() {
  $(this).parent().parent().parent().slideUp();
    
  });  
}