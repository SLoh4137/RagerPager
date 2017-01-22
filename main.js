var map;
var pos;

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 0, lng: 0},
      zoom: 18,
      zoomControl: true,
      zoomControlOptions: {
          position: google.maps.ControlPosition.TOP_RIGHT
      },
      streetViewControl: false,
    });

    //var infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        //infoWindow.setPosition(pos);
        //infoWindow.setContent('Location found.');
        map.setCenter(pos);

      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
    updateMap();

    styleNum=0;
	  // Add a marker clusterer to manage the markers.
    flameCluster = new MarkerClusterer(map, allFlames, {
			zoomOnClick:false,
			styles: clusterStyles,
	  });
	  
	 google.maps.event.addListener(flameCluster, "clusterclick", function () {
		flameClick();
		alert('MarkerClusterer click event');
	 });


  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
  }

function itsLit() {
	updatePosition();
	addFlame(pos);
}

function dropFlame(pos) {
  var fire = 'images/Fire.png';
  var marker = new google.maps.Marker({
    position: pos,
    map: map,
    animation: google.maps.Animation.DROP,
    title: 'It\'s Lit!',
    icon: fire,
  });
  marker.addListener('click', flameClick);
  allFlames.push(marker);
  updateClustering(marker);
}

function flameClick() {
  $(comment).placeholder = 'Add comment';
  $(comment).value = '';
  openComments();

  
}

function openComments() {
  $("#myModal").modal();
  //if within a certain distance, add comment is an option
  //uber button
}


function submitComment(comment) {
  addComment(pos, comment);
  updateClustering();
}

function updatePosition() {

	if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        
		
		newpos = {
		
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
		pos=newpos;
		
		alert(pos.lat);
		alert(pos.lng);

      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
	  return null;
    }

}
