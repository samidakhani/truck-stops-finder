var infos=[];

function createMarkers(results){

    for (var i = 0; i < results.length; i++) {
        var place = results[i];
        var placeTypes = place.types;

        if (isInArray(placeTypes, 'gas_station') && (isInArray(placeTypes, 'food') || isInArray(placeTypes, 'restaurant'))) {

            loadTruckStopInfoWindow(place);

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

    var content= getCurrLocInfoWindow(location);
    var infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(marker,'click',
        (function(marker,content,infowindow){

            return function() {

                closeInfoWindow();

                infowindow.setContent(content);
                infowindow.open(map,marker);
                infos[0]=infowindow;
            };

        })(marker,content,infowindow));

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

function closeInfoWindow(){

    if(infos.length > 0){

        infos[0].set("marker", null);
        infos[0].close();
        infos.length = 0;
    }
}

function getCurrLocInfoWindow(location){

    var content= "My location";
    return content;

}





