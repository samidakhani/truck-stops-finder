
var currentLocationBtn;
var clearMarkersBtn;

function createClearMarkersBtn(clearMarkersBtn){

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginRight= '10px';
    controlUI.style.marginTop= '10px';
    controlUI.style.textAlign = 'center';
    clearMarkersBtn.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlImg = document.createElement('img');
    controlImg.id = 'clearMarkerBtn';
    controlImg.src ="images/clear_button.png";
    controlImg.style.width = '20px';
    controlImg.style.height = '18px';
    controlImg.style.padding ="2px";
    controlUI.appendChild(controlImg);

    //Setup the click event listeners
    controlUI.addEventListener('click', function() {
        clearMarkersBtnClick();
    });

}

function createCurrentLocationBtn(currentLocationBtn){

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginRight = '10px';
    currentLocationBtn.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlImg = document.createElement('img');
    controlImg.id = 'currLocationBtn';
    controlImg.src ="images/current_location.png";
    controlImg.style.width = '20px';
    controlImg.style.height = '20px';
    controlImg.style.padding ="3px";
    controlUI.appendChild(controlImg);

    //Setup the click event listeners
    controlUI.addEventListener('click', function() {
        currentLocationBtnClick();
    });
}

function createMapControls(map){

    clearMarkersBtn = document.createElement('div');
    createClearMarkersBtn(clearMarkersBtn);
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(clearMarkersBtn);
    clearMarkersBtn.style.display = 'none';

    currentLocationBtn = document.createElement('div');
    createCurrentLocationBtn(currentLocationBtn);
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(currentLocationBtn);
}
