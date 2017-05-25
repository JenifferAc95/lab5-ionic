import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp({
      apiKey: "AIzaSyDkMUTyKTxN0qIxleTdoRAIGdzArx6-2hU",
      authDomain: "lab5-ionic-firebase.firebaseapp.com",
      databaseURL: "https://lab5-ionic-firebase.firebaseio.com",
      projectId: "lab5-ionic-firebase",
      storageBucket: "lab5-ionic-firebase.appspot.com",
      messagingSenderId: "755928407690"
    });


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
