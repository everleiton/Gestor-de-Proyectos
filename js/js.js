
$(document).ready(function() {
$(function() {
  $('.btnherramenta > div').hover(function() {
    $(this).css('margin-left', '0px'); 
  }, function() {
    // vuelve a dejar el <div> como estaba al hacer el "mouseout"
    $(this).css('margin-left', '-100px');
  });
});

$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });
     




/* Al añadir los botones no se añade el tooltipped*/
$(document).ready(function(){
   $('.tooltipped').tooltip({delay: 50});
 });
});