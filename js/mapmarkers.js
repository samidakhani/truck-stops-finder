

function isInArray(array,value){
    return array.indexOf(value) > -1;
}

function createMarkers(results){

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

function paginateMarkers(results, status,pagination){

    if (status == google.maps.places.PlacesServiceStatus.OK) {
        createMarkers(results);

        if (pagination.hasNextPage) {
            pagination.nextPage();
        }

    }
}

function deleteTruckStopMarkers(){
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

function loadCurrentLocationMarker(location){

    var marker=new google.maps.Marker({
        map: map,
        position: location,
        icon : 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    });
    markers.push(marker);
}

function loadTruckStopMarkers(location){

    var request = {
        location : location,
        keyword : 'Truck Stop',
        radius : '160934',
        openNow : true,
        rankBy : google.maps.places.RankBy.PROMINENCE
    };

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request,paginateMarkers);

}


