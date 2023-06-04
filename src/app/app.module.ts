import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from "src/environments/environment";

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { MenuComponent } from './components/menu/menu.component';
import { TravelDocsComponent } from './components/travel-docs/travel-docs.component';
import { VehicleInfoComponent } from './components/vehicle-info/vehicle-info.component';  

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    MenuComponent,
    TravelDocsComponent,
    VehicleInfoComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
