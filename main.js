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
        handleLocationError(true);
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false);
    }
    updateMap();

    styleNum=0;
	  // Add a marker clusterer to manage the markers.
    flameCluster = new MarkerClusterer(map, allFlames, {
			zoomOnClick:false,
			styles: clusterStyles,
	  });


   google.maps.event.addListener(flameCluster, "click", function(c) {
     /*
      var mar = c.getMarkers();
      var commentStrings = [];
      for (var i = 0; i < mar.length; i++){
        var comment = getComment(mar[i].timestamp);
        if(comment != null) {
          commentStrings.push(comment);
        }
      }
      */
      var commentStrings = ["wow so lit", "littest i've ever seen", "my hands are littaly burning"];
      flameClick(commentStrings);
      console.log(commentStrings);
   });
  }

  function handleLocationError(browserHasGeolocation) {
    if(browserHasGeolocation) {
      console.log("Error: The Geolocation service failed.")
    } else {
      console.log("Error: Your browser doesn\'t support geolocation.")
    }
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

function flameClick(commentStrings) {
  document.getElementById('comment').placeholder = 'Add comment';
  document.getElementById('comment').value = '';
  openComments(commentStrings);
}

function openComments(commentStrings) {
  updateComments(commentStrings);
  $("#myModal").modal();
}

function updateComments(commentStrings) {

   $('#modal_container').empty();

   for (var j = 0; j < commentStrings.length; j++ ){

      var div = document.createElement("div");
      div.innerHTML = commentStrings[j];
      document.getElementById("modal_container").appendChild(div);
      div.setAttribute('class', 'modal-body');

    };

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
        handleLocationError(true);
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false);
	  return null;
    }

}
