import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { BaseComponent } from './base.component';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
})
export class TimeComponent extends BaseComponent{
  protected topic = 'time';

  constructor(http: Http) {
    super(http);
    this.retrieveDescription();
  }
}