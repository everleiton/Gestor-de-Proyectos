var listaProyectos = [];

var dataTable=[];
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
$(document).ready(function () {
    function load_data() {
    listaProyectos = Persister.loadObj('listaProyectos', "[]");
    for (var i = 0; i < listaProyectos.length; i++) {
      if (listaProyectos[i] != null) {
        personas.push({name: listaProyectos[i].nombre, y: listaProyectos[i]});
        
      }
    }
    
    contProyecto=  listaProyectos.length;
    
  }
       Highcharts.chart('containerproyecto', {
           chart: {
               plotBackgroundColor: null,
               plotBorderWidth: null,
               plotShadow: false,
               type: 'pie'
           },
           title: {
               text: 'Reporte de proyectos 2016'
           },
           tooltip: {
               pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
           },
           plotOptions: {
               pie: {
                   allowPointSelect: true,
                   cursor: 'pointer',
                   dataLabels: {
                       enabled: false
                   },
                   showInLegend: true
               }
           },
           series: [{
               name: 'Brands',
               colorByPoint: true,
               dataTable:[]
           }]
       });
   });