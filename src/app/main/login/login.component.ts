import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared/shared.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private sharedService: SharedService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  logUserIn(): void {
    // will hit the login service
    const loginSuccess = true;

    if (loginSuccess) {
      // redirect to listing
      this.sharedService.toggleHeader(true);
      this.router.navigate(['listing']);

    } else {
      // show bad password message
    }
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

}
