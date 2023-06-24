import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit{

  public token: string='';
  public userId: string='';
  password = new FormControl('');

  constructor(private activatedRoute: ActivatedRoute, public authService: AuthService){
    
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['userId'];
    });

    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.token = queryParams['token'];
    })
  }

  resetPassword(){
    this.authService.resetPassword(this.userId, this.token, this.password.value!);
  }
}
