
function currentLocationBtnClick(){

    if(markers.length != 0){
        deleteTruckStopMarkers();

        var latField = document.getElementById("latTxt");
        var longField = document.getElementById("lngTxt");
        var addrField =  document.getElementById("addrTxt");

        latField.value = '';
        longField.value = '';
        addrField.value = '';
    }

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            var location = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            loadMap(location);

        },null);


    }else{
        alert("Cannot detect current location");
    }

}

function clearMarkersBtnClick(){

    deleteTruckStopMarkers();

    clearMarkersBtn.style.display = 'none';

    var latField = document.getElementById("latTxt");
    var longField = document.getElementById("lngTxt");
    var addrField =  document.getElementById("addrTxt");

    latField.value = '';
    longField.value = '';
    addrField.value = '';

}

function loadMapBtnClick(){

    var latField = document.getElementById("latTxt");
    var longField = document.getElementById("lngTxt");
    var addrField =  document.getElementById("addrTxt");

    if(markers.length != 0){
        deleteTruckStopMarkers();
    }

    if(latField.value !='' && longField.value != ''){

        var lat = latField.value;
        var lng = longField.value;

        var location = {lat: parseFloat(lat), lng: parseFloat(lng)};
        loadMap(location);


    }else if(addrField.value !=''){

        var address = addrField.value;
        gecode(address);

    }else{
        alert("Please enter Lat/Long OR Address");
    }

}

function loadMap(location){

    map.setCenter(location);
    map.setZoom(9);

    loadCurrentLocationMarker(location);
    loadTruckStopMarkers(location);

    clearMarkersBtn.style.display = 'block';

}