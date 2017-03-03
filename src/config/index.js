// This separate configuration file
import * as firebase from 'firebase'

// adding firebase configuration
var config = {
    apiKey: "AIzaSyBd3BiGorQDkk4i2Y8f3nAcqomp0ikiUNk",
    authDomain: "blood-bank-system-ecabb.firebaseapp.com",
    databaseURL: "https://blood-bank-system-ecabb.firebaseio.com",
    storageBucket: "blood-bank-system-ecabb.appspot.com",
    messagingSenderId: "539807996340"
};
firebase.initializeApp(config);
