var downloadData = $.ajax("https://raw.githubusercontent.com/CPLN690-MUSA610/datasets/master/json/philadelphia-bike-crashes-snippet.json").done(function(response){
  return response;
});


var parseData = function(text) {
  return JSON.parse(text);
};

var makeMarkers = function(objects) {
  listofmarkers = [];
  _.each (objects, function(ob){
    var lat = ob["LAT"];
    var lng = ob["LNG"];
    listofmarkers.push(L.marker([lat, lng]));
  });
  return listofmarkers;
};

var plotMarkers = function(markerlist) {
  _.each(markerlist, function(mark){
    mark.addTo(map);
  });
};


/* =====================
 CODE EXECUTED DOWN HERE! (Removed so Week 4 data wouldn't plot)
===================== =
*/
//downloadData.done(function(data) {
  //var parsed = parseData(data);
  //var markers = makeMarkers(parsed);
  //plotMarkers(markers);
  //removeMarkers(markers);
//});


/* Functinality!
*/

$(document).ready(function() {

  var arrayOfAllInputs = $('.sidebar input');

  //enamble editing
  _.each(arrayOfAllInputs, function(inputX){
    $(inputX).prop('disabled', false);
  });

  $('button').click(function() {
    var InputURL = $('#url-input').val();
    var urlstring = String(InputURL);
    var InputLONG = $('#long-input').val();
    var SLong = String(InputLONG);
    var InputLAT = $('#lat-input').val();
    var SLat = String(InputLAT);
    var inData = $.ajax(urlstring).done(function(response){
      var jsObs = JSON.parse(response);
      _.each (jsObs, function(ob){
        var lat = ob[SLat];
        var lng = ob[SLong];
        L.marker([lat, lng]).addTo(map);
      });
    });
  });
});



//https://raw.githubusercontent.com/CPLN690-MUSA610/datasets/master/json/philadelphia-bike-crashes-snippet.json



/* =====================
 Leaflet setup
===================== */

var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 14
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);
