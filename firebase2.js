var allFlames = [];
var flameCluster;
var clusterStyles = [{
   textColor: 'black',
   url: 'images/m1.png',
   height: 59,
   width: 48,
   anchor: [-16, 0],
 },
 {
   textColor: 'black',
   url: 'images/m2.png',
   height: 89,
   width: 72,
   anchor: [-16, 0],
 },
 {
   textColor: 'black',
   url: 'images/m3.png',
   height: 118,
   width: 96,
   anchor: [-16, 0],
 }];

//Sign in
firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log("Signed in");
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;

  } else {
    // User is signed out.
    // ...
  }
  // ...
});

/**
* Adds a location to firebase
* Comment is null
* Used in calculation of flame size. For that use equalTo(
* Ordered by timestamp
)
*/
function addFlame(pos) {
  var ref = firebase.database().ref('locations');
  var newKey = new Date().getTime();
  var data = {
    timestamp: newKey,
    lat: pos.lat,
    lng: pos.lng,
    comment: null
  };

  firebase.database().ref('locations/' + newKey).update(data);
}

function addComment(pos, comment) {
  var ref = firebase.database().ref('locations');
  var newKey = new Date().getTime();
  var data = {
    timestamp: newKey,
    lat: pos.lat,
    lng: pos.lng,
    comment: comment
  };

  firebase.database().ref('locations/' + newKey).update(data);
}

function updateMap() {
  var timeBeforeCutOff = (60 * 15 * 1000)
  //30 minutes before current time
  var startTime = new Date().getTime();
  var cutoff = startTime - timeBeforeCutOff;

  // Reference to the locations in Firebase
  var locations = firebase.database().ref('locations');
  var ordered = locations.orderByChild("timestamp");

  window.setInterval(function() {
    var cutoff = new Date().getTime() - timeBeforeCutOff;
    var old = locations.orderByChild("timestamp").endAt(cutoff);
    var listener = old.on('child_added', function(snapshot) {
      snapshot.ref.remove();
    });

  }, 60 * 1000)

  //All flamesToAdd including those already in database and those added in real time
  var flamesToAdd = ordered.startAt(cutoff);

  //Listens for when flames get added to the list flamesToAdd
  var flameListener = flamesToAdd.on('child_added', function(data) {
    var value = data.val();
    var posToAdd = {
      lat: value.lat,
      lng: value.lng
    };

    dropFlame(posToAdd);
 });
}


//marker is the flame icon that is dropped
function updateClustering(marker) {

  //Eric what does false mean
  flameCluster.addMarker(marker, false);

	if(flameCluster.getTotalMarkers() > 9) {
		styleNum=1;
	}
	else if (flameCluster.getTotalMarkers() > 20) {
		styleNum=2;
	}
}

function callUber() {

}

function getComments() {

}
