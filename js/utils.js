function isInArray(array,value){
    return array.indexOf(value) > -1;
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

function getPlaceTypes(placeTypes){

    var content = "<div>";
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

    return content;
}


function getGasFeedData(place){

    var lat = place.geometry.location.lat();
    var lng = place.geometry.location.lng();

    var data = getApiData(lat,lng);

    var json = JSON.parse(data);

    var map = new Object();
    map["station"] = json.station;
    map["diesel_price"] = json.diesel_price;
    map["last_updated"] = json.last_updated;

    return map;

}