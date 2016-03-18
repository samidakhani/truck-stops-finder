/**
 * Created by sdakhani on 3/16/16.
 */

function gecode(address){

    var location   = new google.maps.LatLng();
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode( {'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            location = results[0].geometry.location;
            loadMap(location);
        }else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}


function reverseGeocode(lat,lng){

    var address;
    var latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            address = results[0].formatted_address;

        }else {
            alert("Reverse Geocode was not successful for the following reason: " + status);
        }
    });

}


function reverseGeocode(latlng){

    var address;
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            address = results[0].formatted_address;

        }else {
            alert("Reverse Geocode was not successful for the following reason: " + status);
        }
    });

}
