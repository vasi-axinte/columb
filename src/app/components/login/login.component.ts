import { Component } from '@angular/core';
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
    this.authService.login(this.email.value!, this.password.value!)
  }

  hasError(): boolean {
    return this.authService.hasError;
  }
}
