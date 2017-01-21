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

function addToFirebase(pos) {
  var currId = firebase.auth().currentUser.uid;
  var ref = firebase.database().ref('locations');
  var newPostKey = new Date().getTime();
  var data = {
    user: currId,
    timestamp: newPostKey,
    lat: pos.lat,
    lng: pos.lng
  };
  
  var updateRef = firebase.database().ref('locations/' + newPostKey);
  updateRef.update(data);
}

function loadMap(map) {
  //5 minutes before current time.
  var startTime = new Date().getTime();
  var cutoff = startTime - (60 * 30 * 1000);

  // Reference to the clicks in Firebase.
 var locations = firebase.database().ref('locations');

 console.log('loadMap');

 // Remove old clicks.
 var ordered = locations.orderByChild("timestamp");
 var old = ordered.endAt(cutoff).limitToLast(1);

 var listener = old.on('child_added', function(snapshot) {
     snapshot.ref.remove();
  });

 var pointsToAdd = ordered.startAt(cutoff).limitToLast(1);

 var pointsListener = pointsToAdd.on('child_added', function(data) {
   var pos = {
     lat: data.lat,
     lng: data.lng
   };
    createMarker(map, pos);
 });

 var pointsListener = locations.on('child_added', function(data) {
   console.log("point");
   var pos = {
     lat: data.lat,
     lng: data.lng
   };
    createMarker(map, pos);
 });

}
