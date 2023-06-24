import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password-email',
  templateUrl: './reset-password-email.component.html',
  styleUrls: ['./reset-password-email.component.scss']
})
export class ResetPasswordEmailComponent {
  email = new FormControl('');

  constructor(public authService: AuthService) {
  }

  sendResetPasswordEmail() {
    this.authService.sendResetPasswordEmail(this.email.value!);
  }
}
