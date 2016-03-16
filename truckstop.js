var map;
var markers = [];
var controlUI;
var controlDiv;

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
 */
function initMap() {

    var myhouse = new google.maps.LatLng(34.83102, -116.70868);

    map = new google.maps.Map(document.getElementById('map'), {
        center: myhouse,
        zoom: 10
    });

    //My location marker
    new google.maps.Marker({
        map: map,
        position: myhouse,
        icon : 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    });

    var request = {
        location : myhouse,
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
 * Show the ClearTruckStop button
 */
function showClearButton(){
    initMap();
    controlDiv.appendChild(controlUI);
}