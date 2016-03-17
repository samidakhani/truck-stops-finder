var infos=[];

function isInArray(array,value){
    return array.indexOf(value) > -1;
}

function createMarkers(results){

    for (var i = 0; i < results.length; i++) {
        var place = results[i];
        var placeTypes = place.types;

        if (isInArray(placeTypes, 'gas_station') && (isInArray(placeTypes, 'food') || isInArray(placeTypes, 'restaurant'))) {

            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });

            var content= getTruckStopInfoWindow(place);
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

function getTruckStopInfoWindow(place){

    var content="<div>";
    var placeTypes = place.types;

    if(isInArray(placeTypes, 'gas_station')){
       content +="<div class='facility_div'><img class='facility_image' src='images/gas_station.png'></div>";
    }

    if(isInArray(placeTypes, 'food') || isInArray(placeTypes, 'restaurant')){
        content +="<div class='facility_div'><img class='facility_image' src='images/restaurant.png'></div>";
    }

    if(isInArray(placeTypes, 'store') || isInArray(placeTypes, 'convenience_store')){
        content +="<div class='facility_div'><img class='facility_image' src='images/store.png'></div>";
    }

    if(isInArray(placeTypes, 'atm')){
        content +="<div class='facility_div'><img class='facility_image' src='images/atm.png'></div>";
    }

    if(isInArray(placeTypes, 'parking')){
        content +="<div class='facility_div'><img class='facility_image' src='images/parking.png'></div>";
    }

    content +="</div>";
   // var content= "My location" + placeTypes;
    return content;

}


