import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { BaseComponent } from './base.component';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
})
export class NetworkComponent extends BaseComponent {
  protected topic = 'network';

  constructor(http: Http) {
    super(http);
    this.retrieveDescription();
  }
}