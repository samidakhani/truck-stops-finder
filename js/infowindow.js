
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


        getGasFeed(place);


        var content = "<div>";
        content += "<h4>" + name + "</h4>";
        content += "<span>" + street_number +", " + route + "</span>"+"<br />";
        content += "<span>" + city + ", " + state +"</span>"+"<br />";
        content += "<span>" + phone + "</span>"+"<br />";
        if(rating)
            content +=getRating(rating);


        content +=getPlaceTypes(placeTypes);
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
