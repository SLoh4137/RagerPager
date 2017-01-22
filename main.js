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
	map.setOptions({minZoom:6});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

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

   google.maps.event.addListener(flameCluster, "click", function(c) {
      var mar = c.getMarkers();
      var commentStrings = [];
      for (var i = 0; i < mar.length; i++ ){
        var comment = getComment(mar[i].timestamp);
        if(comment != null) {
          commentStrings.push(comment);
        }
      }
      console.log(commentStrings);
      flameClick();
   });
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
  }

function itsLit() {
  var timestamp = new Date().getTime();
	updatePosition();
	addFlame(pos, timestamp);
}

function dropFlame(pos, timestamp) {
  var fire = 'images/Fire.png';
  var marker = new google.maps.Marker({
    position: pos,
    map: map,
    timestamp: timestamp,
    animation: google.maps.Animation.DROP,
    title: 'It\'s Lit!',
    icon: fire,
  });
  //marker.addListener('click', flameClick);
  allFlames.push(marker);
  updateClustering(marker);
}

function flameClick() {
  document.getElementById('comment').placeholder = 'Add comment';
  document.getElementById('comment').value = '';
  openComments();
}

function openComments() {
  updateComments();
  $("#myModal").modal();
}

function updateComments() {

   $('#modal_container').empty();
  var div = document.createElement("div");
  div.innerHTML = "<p>"+"comment 1"+"</p>";
  document.getElementById("modal_container").appendChild(div);
  div.setAttribute('class', 'modal-body');

  //alert(thatFlameCluster.distanceBetweenPoints_(thatFlameCluster.getCenter,pos));
  //if(flameCluster.distanceBetweenPoints_(flameCluster.getCenter,pos)>1) {
    //alert(flameCluster.distanceBetweenPoints_(flameCluster.getCenter,pos));
    //$('#input_div').hide();
  //}

}

function submitComment(comment) {
  var timestamp = new Date().getTime();
  addComment(pos, comment, timestamp);
}

function updatePosition() {

	if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {


		newpos = {

          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
		pos=newpos;

		//alert(pos.lat);
		//alert(pos.lng);

      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
	  return null;
    }

}
