import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { BaseComponent } from './base.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
})
export class NetworkComponent extends BaseComponent {
  protected topic = 'network';

  constructor(http: Http, authservice: AuthService) {
    super(http, authservice);
    this.retrieveDescription();
  }
}