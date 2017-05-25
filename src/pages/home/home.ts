import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userProfile: any = null;
  zone: NgZone;

  constructor(public navCtrl: NavController, private googlePlus: GooglePlus) {
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
      'webClientId': '755928407690-k8398gjuhkpsaid95b2k6bth6b77u91e.apps.googleusercontent.com',
      'offline': true
    }).then( res => {
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then( success => {
          console.log("Firebase success: " + JSON.stringify(success));
          
        })
        .catch( error => console.log("Firebase failure: " + JSON.stringify(error)));
      }).catch(err => console.error("Error: ", err));
  }

}
