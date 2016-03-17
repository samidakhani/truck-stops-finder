function initAutocomplete() {

    var input = document.getElementById('addrTxt');
    var options = {
        types: ['geocode'],
        componentRestrictions: {country: 'us'}
    };

    autocomplete = new google.maps.places.Autocomplete(input,options);
}
