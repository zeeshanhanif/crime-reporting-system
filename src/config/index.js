// This separate configuration file
import * as firebase from 'firebase'

// adding firebase configuration
var config = {
    apiKey: "AIzaSyBMApqHehUgQWVhoOPX6OrOlg_vTSNsmrI",
    authDomain: "crime-reporting-system-829f2.firebaseapp.com",
    databaseURL: "https://crime-reporting-system-829f2.firebaseio.com",
    storageBucket: "crime-reporting-system-829f2.appspot.com",
    messagingSenderId: "968860062032"
  };
  firebase.initializeApp(config);
