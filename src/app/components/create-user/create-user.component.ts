import { Component } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FormControl } from '@angular/forms';

import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  email = new FormControl('');
  password = new FormControl('');

  constructor(public authService: AuthService){
  }

  createUser(){
    return this.authService.SignUp(this.email.value!, this.password.value!);
    // this.angularFireAuth
    // .createUserWithEmailAndPassword(this.email.value || '', this.password.value || '')
    // .then(res => {
    //   // res.user?.updateProfile({
    //   //   displayName: "test",
    //   // }).then(() => {
    //   //   //success
    //   // })
    //   // res.user?.sendEmailVerification();
    //   console.log(res);
    // })
    // .catch(error => {
    //   console.error(error);
    //   alert('oups');
    // })
    // return false;
  }
}
