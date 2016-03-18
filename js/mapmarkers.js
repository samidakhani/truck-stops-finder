var infos=[];

function isInArray(array,value){
    return array.indexOf(value) > -1;
}

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

function loadTruckStopInfoWindow(place){

    var placeId = place.place_id;
    var placeTypes = place.types;

    var request = {
        placeId: placeId
    };

    service = new google.maps.places.PlacesService(map);
    service.getDetails(request, loadPlaceDeatils);

}

function loadPlaceDeatils(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {

        var name = place.name;
        var address = place.formatted_address;
        var phone = place.formatted_phone_number;
        var rating =place.rating;
        var placeTypes = place.types;


        var addressComponent=place.address_components;
        var street_number = addressComponent[0].long_name;
        var route = addressComponent[1].long_name;
        var city = addressComponent[2].long_name;
        var state = addressComponent[3].short_name;
        var country = addressComponent[4].types;
        var postalCode = addressComponent[5].types;


        var content = "<div>";
        content += "<h4>" + name + "</h4>";
        content += "<span>" + street_number +", " + route + "</span>"+"<br />";
        content += "<span>" + city + ", " + state +"</span>"+"<br />";
        content += "<span>" + phone + "</span>"+"<br />";
        if(rating) {
            content +=getRating(rating);
        }

        content += "<div>";
        if (isInArray(placeTypes, 'gas_station')) {
            content += "<div class='facility_div'><img class='facility_image' src='images/gas_station.png'></div>";
        }

        if (isInArray(placeTypes, 'food') || isInArray(placeTypes, 'restaurant')) {
            content += "<div class='facility_div'><img class='facility_image' src='images/restaurant.png'></div>";
        }

        if (isInArray(placeTypes, 'store') || isInArray(placeTypes, 'convenience_store')) {
            content += "<div class='facility_div'><img class='facility_image' src='images/store.png'></div>";
        }

        if (isInArray(placeTypes, 'atm')) {
            content += "<div class='facility_div'><img class='facility_image' src='images/atm.png'></div>";
        }

        if (isInArray(placeTypes, 'parking')) {
            content += "<div class='facility_div'><img class='facility_image' src='images/parking.png'></div>";
        }
        content += "</div>";

        content += "</div>";

        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });

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


function getRating(rating){

    var content="";

    var ratingInt =parseFloat(rating);
    if(ratingInt > 0 && ratingInt <=0.5) {
        content += "<img style='width:10px;height: 10px;' src='images/half_rating.png'>";
    }else if(ratingInt > 0.5 && ratingInt <=1){
        content += "<img style='width:10px;height: 10px;' src='images/full_rating.png'>";
    }else if(ratingInt > 1 && ratingInt <=1.5){
        content += "<img style='width:10px;height: 10px;' src='images/full_rating.png'>";
        content += "<img style='width:10px;height: 10px;' src='images/half_rating.png'>";
    }else if(ratingInt > 1.5 && ratingInt <=2){
        content += "<img style='width:10px;height: 10px;' src='images/full_rating.png'>";
        content += "<img style='width:10px;height: 10px;' src='images/full_rating.png'>";
    }else if(ratingInt > 2 && ratingInt <=2.5){
        content += "<img style='width:10px;height: 10px;' src='images/full_rating.png'>";
        content += "<img style='width:10px;height: 10px;' src='images/full_rating.png'>";
        content += "<img style='width:10px;height: 10px;' src='images/half_rating.png'>";
    }else if(ratingInt > 2.5 && ratingInt <=3){
        content += "<img style='width:10px;height: 10px;' src='images/full_rating.png'>";
        content += "<img style='width:10px;height: 10px;' src='images/full_rating.png'>";
        content += "<img style='width:10px;height: 10px;' src='images/full_rating.png'>";
    }else if(ratingInt > 3 && ratingInt <=3.5){
        content += "<img style='width:10px;height: 10px;' src='images/full_rating.png'>";
        content += "<img style='width:10px;height: 10px;' src='images/full_rating.png'>";
        content += "<img style='width:10px;height: 10px;' src='images/full_rating.png'>";
        content += "<img style='width:10px;height: 10px;' src='images/half_rating.png'>";
    }else if(ratingInt > 3.5 && ratingInt <=4){
        content += "<img style='width:10px;height: 10px;' src='images/full_rating.png'>";
        content += "<img style='width:10px;height: 10px;' src='images/full_rating.png'>";
        content += "<img style='width:10px;height: 10px;' src='images/full_rating.png'>";
        content += "<img style='width:10px;height: 10px;' src='images/full_rating.png'>";
    }else if(ratingInt > 4 && ratingInt <=4.5){
        content += "<img style='width:10px;height: 10px;' src='images/full_rating.png'>";
        content += "<img style='width:10px;height: 10px;' src='images/full_rating.png'>";
        content += "<img style='width:10px;height: 10px;' src='images/full_rating.png'>";
        content += "<img style='width:10px;height: 10px;' src='images/full_rating.png'>";
        content += "<img style='width:10px;height: 10px;' src='images/half_rating.png'>";
    }else if(ratingInt > 4.5 && ratingInt <=5){
        content += "<img style='width:10px;height: 10px;' src='images/full_rating.png'>";
        content += "<img style='width:10px;height: 10px;' src='images/full_rating.png'>";
        content += "<img style='width:10px;height: 10px;' src='images/full_rating.png'>";
        content += "<img style='width:10px;height: 10px;' src='images/full_rating.png'>";
        content += "<img style='width:10px;height: 10px;' src='images/full_rating.png'>";
    }

    return content;
}



