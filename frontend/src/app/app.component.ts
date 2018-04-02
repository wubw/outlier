import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private msalService: AuthService, private router: Router) {

  }

  private signin() {
    this.msalService.login().then(() => this.router.navigate(['']));
  }

  private signout() {
    this.msalService.logout();
  }

  private isOnline(): boolean {
    return this.msalService.isOnline();
  }

  private get username(): string {
    if (this.isOnline()) {
      return this.msalService.username();
    }
    return '';
  }
}
