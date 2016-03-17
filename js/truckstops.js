var map;
var markers = [];

function initMap(){

    var initLat=37.090240;
    var initLng=-95.712891;
    var location = new google.maps.LatLng(initLat,initLng);

    map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 4
    });

    createMapControls(map);

}
