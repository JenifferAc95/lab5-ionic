import { Component, NgZone } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';
import { EventsPage } from '../events/events';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userProfile: any = null;
  zone: NgZone;

  constructor(public navCtrl: NavController, private googlePlus: GooglePlus, public app: App) {
    this.zone = new NgZone({});
    firebase.auth().onAuthStateChanged( user => {
      this.zone.run( () => {
        if (user){
          this.userProfile = user;
        } else {
          this.userProfile = null;
        }
      });
    });
  }

  loginUser(): void {
    this.googlePlus.login({
      'webClientId': '1009280345719-487jkn2qg47mokspiudl89vt5hbppf6o.apps.googleusercontent.com',
      'offline': true
    }).then( res => {
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then( success => {
          console.log("Firebase success: " + JSON.stringify(success));
          //this.app.getRootNav().setRoot(EventsPage);
        })
        .catch( error => console.log("Firebase failure: " + JSON.stringify(error)));
      }).catch(err => console.error("Error: ", err));
  }

}
