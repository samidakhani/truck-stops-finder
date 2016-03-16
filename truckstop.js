var map;
var markers = [];
var latField;
var longField;
var addrField;

/**
 * Checks if the array contains a value
 * @param array
 * @param value
 * @returns {boolean}
 */
function isInArray(array,value){
    return array.indexOf(value) > -1;
}

/**
 * Create makers for truck stops that provide facilities:fuel and food
 * @param results
 * @param status
 */
function createTruckStopMarkers(results, status){

    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            var placeTypes = place.types;

            if (isInArray(placeTypes, 'gas_station') && isInArray(placeTypes, 'food')) {

                var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                });

                markers.push(marker);

            }

        }
    }
}

/**
 * Deletes the truck stops on ClearTruckStops button click
 */
function deleteTruckStopMarkers(){
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
    latField.value = '';
    longField.value = '';
    addrField.value = '';
}

/**
 * Creates a button to clear the map makers for truck stops
 * @param controlDiv
 * @param map
 */
function createClearControl(controlDiv, map) {

    // Set CSS for the control border.
    controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginRight= '10px';
    controlUI.style.marginTop= '10px';
    controlUI.style.textAlign = 'center';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '12px';
    controlText.style.lineHeight = '20px';
    controlText.style.paddingLeft = '10px';
    controlText.style.paddingRight = '10px';
    controlText.style.paddingTop = '2px';
    controlText.style.paddingBottom = '2px';
    controlText.innerHTML = 'Clear Truck Stops';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function() {
        deleteTruckStopMarkers();
        controlDiv.removeChild(controlUI)
    });

}

/**
 * Loads the truck stop markers nearby provided location
 * @param lat
 * @param lang
 */
function initMap(lat,lang) {

    if(markers.length != 0){
        deleteTruckStopMarkers();
    }

    var location = new google.maps.LatLng(lat,lang);

    map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 10
    });

    //My location marker
    var marker=new google.maps.Marker({
        map: map,
        position: location,
        icon : 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    });
    markers.push(marker);

    var request = {
        location : location,
        keyword : 'Truck Stop',
        openNow : true,
        rankBy : google.maps.places.RankBy.DISTANCE
    };

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request,createTruckStopMarkers);

    //Map Control -- Start
    controlDiv = document.createElement('div');
    var centerControl = new createClearControl(controlDiv, map);

    controlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);

    //Map Control -- Stop

}

/**
 * Invoked LoadMap button on buttonClick
 */
function loadTruckStops(){

    latField = document.getElementById("latitude");
    longField = document.getElementById("longitude");
    addrField =  document.getElementById("address");

    if(latField.value !='' && longField.value != ''){
        initMap(latField.value,longField.value);
    }else if(addrField.value !=''){
        loadTruckStopsFromAddress(addrField.value);
    }else{
        alert("Please enter Lat/Long OR Address");
    }

   // initMap(34.83102, -116.70868);
}

/**
 * Calls the initMap method after converting address to lat and longitude
 * @param address
 */
function loadTruckStopsFromAddress(address){

    var latitude;
    var longitude;
    var geocoder = new google.maps.Geocoder();
    var latlang = new google.maps.LatLng();


    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            latlang = results[0].geometry.location;
            latField.value = latlang.lat();
            longField.value = latlang.lng();
            initMap(latlang.lat(),latlang.lng());

        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });

}


