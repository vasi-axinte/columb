import { Component } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FormControl } from '@angular/forms';

import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  userData: Observable<firebase.User | null>;
  email = new FormControl('');
  password = new FormControl('');

  constructor(private angularFireAuth: AngularFireAuth){
    this.userData = angularFireAuth.authState;
  }

  createUser(){
    this.angularFireAuth
    .createUserWithEmailAndPassword(this.email.value || '', this.password.value || '')
    .then(res => {
      console.log(res);
      alert('oups');
    })
    .catch(error => {
      console.error(error);
      alert('oups');
    })
    return false;
  }

  login(){
    this.angularFireAuth
    .signInWithEmailAndPassword("test@gmail.com", "testAbcd12")
    .then(res => {
      console.log(res);
      this.angularFireAuth
        .authState
        .subscribe((user) => {
          if (user) {
            console.log(user);
          }
      });
    })
    .catch(error => {
      console.error(error);
    })
  }
}
