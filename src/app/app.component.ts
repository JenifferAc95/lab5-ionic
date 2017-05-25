import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { HomePage } from '../pages/home/home';
import { EventsPage } from '../pages/events/events';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp({
      apiKey: "AIzaSyA7BkJS_lb4HEXQNeiLxG_Hi-XITVbJjMM",
      authDomain: "fir-ioniclab5.firebaseapp.com",
      databaseURL: "https://fir-ioniclab5.firebaseio.com",
      projectId: "firebase-ioniclab5",
      storageBucket: "firebase-ioniclab5.appspot.com",
      messagingSenderId: "1009280345719"
    });


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
