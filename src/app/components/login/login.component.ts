import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = new FormControl('');
  password = new FormControl('');

  constructor(public authService: AuthService) {
  }

  login() {
    return this.authService.SignIn(this.email.value!, this.password.value!)
  }
}
