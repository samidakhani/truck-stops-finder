
function getApiData(lat,lng){

    return $.ajax({
        url: 'http://api.mygasfeed.com/stations/radius/33.624631/-117.879147/0.2/diesel/distance/8w8dgi79x1.json?callback=?',
        type: 'GET',
        dataType: 'jsonp',
        success:function(data){
            alert(data);
        }
    });
}
