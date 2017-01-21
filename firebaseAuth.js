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
  //var newPostKey = ref.push().key;
  var newPostKey = new Date().getTime();
  ref.onDisconnect().remove();

  var data = {
    user: currId,
    timestamp: newPostKey,
    lat: pos.lat,
    lng: pos.lng
  };
  console.log("data made");

  var updates = {};
  updates['/locations/' + newPostKey] = data;

  return firebase.database().ref().update(updates);
}

function loadMap(maps) {
  //5 minutes before current time.
  var startTime = new Date().getTime() - (60 * 1 * 1000);

  // Reference to the clicks in Firebase.
 var locations = firebase.database().ref('locations');

 console.log('loadMap');
 // Remove old clicks.
 locations.orderByChild("timestamp").endAt(startTime).on('child_added',
   function(snapshot) {
     console.log('snapshot');
     console.log(snapshot);
     //snapshot.ref().remove();
   }
 );

}

/**
* Data object to be written to Firebase.
*/



/**
* Starting point for running the program. Authenticates the user.
* @param {function()} onAuthSuccess - Called when authentication succeeds.
*
function initAuthentication(onAuthSuccess) {
  firebase.authAnonymously(function(error, authData) {
    if (error) {
      console.log('Login Failed!', error);
    } else {
      data.sender = authData.uid;
      onAuthSuccess();
    }
  }, {remember: 'sessionOnly'});  // Users will get a new id for every session.
}
*/
/**
 * Set up a Firebase with deletion on clicks older than expirySeconds
 * @param {!google.maps.visualization.HeatmapLayer} heatmap The heatmap to
 * which points are added from Firebase.
 *
function initFirebase(heatmap) {
  // 10 minutes before current time.
  var startTime = new Date().getTime() - (60 * 10 * 1000);
  // Reference to the clicks in Firebase.
  var clicks = firebase.child('clicks');
  // Listener for when a click is added.
  clicks.orderByChild('timestamp').startAt(startTime).on('child_added',
    function(snapshot) {
      // Get that click from firebase.
      var newPosition = snapshot.val();
      var point = new google.maps.LatLng(newPosition.lat, newPosition.lng);
      var elapsed = new Date().getTime() - newPosition.timestamp;
      // Add the point to  the heatmap.
      heatmap.getData().push(point);
      // Requests entries older than expiry time (10 minutes).
      var expirySeconds = Math.max(60 * 10 * 1000 - elapsed, 0);
      // Set client timeout to remove the point after a certain time.
      window.setTimeout(function() {
        // Delete the old point from the database.
        snapshot.ref().remove();
      }, expirySeconds);
    }
  );
  // Remove old data from the heatmap when a point is removed from firebase.
  clicks.on('child_removed', function(snapshot, prevChildKey) {
    var heatmapData = heatmap.getData();
    var i = 0;
    while (snapshot.val().lat != heatmapData.getAt(i).lat()
      || snapshot.val().lng != heatmapData.getAt(i).lng()) {
      i++;
    }
    heatmapData.removeAt(i);
  });
}
*/
/**
 * Updates the last_message/ path with the current timestamp.
 * @param {function(Date)} addClick After the last message timestamp has been updated,
 *     this function is called with the current timestamp to add the
 *     click to the firebase.
 *
function getTimestamp(addClick) {
  // Reference to location for saving the last click time.
  var ref = firebase.child('last_message/' + data.sender);
  ref.onDisconnect().remove();  // Delete reference from firebase on disconnect.
  // Set value to timestamp.
  ref.set(Firebase.ServerValue.TIMESTAMP, function(err) {
    if (err) {  // Write to last message was unsuccessful.
      console.log(err);
    } else {  // Write to last message was successful.
      ref.once('value', function(snap) {
        addClick(snap.val());  // Add click with same timestamp.
      }, function(err) {
        console.warn(err);
      });
    }
  });
}
*/
/**
 * Adds a click to firebase.
 * @param {Object} data The data to be added to firebase.
 *     It contains the lat, lng, sender and timestamp.
 *
function addToFirebase(data) {
  getTimestamp(function(timestamp) {
    // Add the new timestamp to the record data.
    data.timestamp = timestamp;
    var ref = firebase.child('clicks').push(data, function(err) {
      if (err) {  // Data was not written to firebase.
        console.warn(err);
      }
    });
  });
}
*/
