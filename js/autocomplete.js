function initAutocomplete() {

    var input = document.getElementById('addressTxt');
    var options = {
        types: ['geocode'],
        componentRestrictions: {country: 'us'}
    };

    autocomplete = new google.maps.places.Autocomplete(input,options);
}
