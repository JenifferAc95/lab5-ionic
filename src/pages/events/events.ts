import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { GooglePlus } from '@ionic-native/google-plus';
import { HomePage } from '../home/home';
import firebase from 'firebase';

/**
 * Generated class for the EventsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
   selector: 'page-events',
   templateUrl: 'events.html',
 })
 export class EventsPage {

   events: FirebaseListObservable<any>;
   userProfile: any = null;
   zone: NgZone;

   constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider, public navParams: NavParams, public AlertCtl: AlertController,private googlePlus: GooglePlus, public app: App) {
     this.events = firebaseProvider.getEvents();
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

   showEvent():void{
     let prompt = this.AlertCtl.create({
       title: 'Ver Evento',
       message: 'Ver un nuevo evento data.nameEvent',

     })
     prompt.present();
   }

   addEvent():void{
     let prompt = this.AlertCtl.create({
       title: 'Agregar Eventos',
       message: 'Agregar un nuevo evento',
       inputs:[
         {
           name: 'nameEvent',
           placeholder: 'Event name'
         },
         {
           name: 'description',
           placeholder: 'Event information'
         },
         {
           name: 'info',
           placeholder: 'Event Description'
         },
         {
           name: 'place',
           placeholder: 'Event place'
         },
         {
           name: 'date',
           placeholder: 'Event date'
         }
       ],
       buttons: [
         {
           text:"Cancel",
           handler: data => {
             console.log("cancel clicked");
           }
         },
         {
           text: "Save Event",
           handler: data =>{
             this.events.push({
               nameEvent: data.nameEvent,
               info: data.info,
               description: data.description,
               place: data.place,
               date: data.date
             })
           }
         }
       ]
     });


     prompt.present();
   }


   logout(): void {

     this.googlePlus.logout().then(() => {
       console.log("logged out");
       this.app.getRootNav().setRoot(HomePage);
     });
   }

 }
