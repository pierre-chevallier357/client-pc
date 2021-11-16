import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
/*import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDxBDplWVzL5-E4TAJckIP-tAQZSEH9lGo",
  authDomain: "client-pc.firebaseapp.com",
  projectId: "client-pc",
  storageBucket: "client-pc.appspot.com",
  messagingSenderId: "39195826909",
  appId: "1:39195826909:web:40bd356ab56991aeac9934",
  measurementId: "G-E6QZBZ0RFE"
};

const app = initializeApp(firebaseConfig);
*/
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
