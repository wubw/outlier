import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private msalService: AuthService, private router: Router) {
  }

  private signin() {
    this.msalService.login().then(() => {
      this.router.navigate([''])
    });
  }
}