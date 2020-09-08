import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBwp-VsUMMX-6F99aHXO45yjy-xV57Ym48",
    authDomain: "scizers-technologies-llp.firebaseapp.com",
    databaseURL: "https://scizers-technologies-llp.firebaseio.com",
    projectId: "scizers-technologies-llp",
    storageBucket: "scizers-technologies-llp.appspot.com",
    messagingSenderId: "316350908672",
    appId: "1:316350908672:web:90b2715d68c2ab06d08be5",
    measurementId: "G-1YWLL6KNRZ"
  };

  let res = firebase.initializeApp(firebaseConfig)
  export default res.database().ref()