import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { BaseComponent } from './base.component';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent extends BaseComponent{
  protected topic = 'time';
  private categories = [];
  private tags = [];

  constructor(http: Http) {
    super(http);
    this.retrieveDescription();
    this.retrieveCategory();
    this.retreiveTag();
  }

  private retrieveCategory() {
    this.http.get(environment.apiUrl + this.topic + '/category')
    .toPromise()
    .then(response => response.text())
    .then(data => this.categories = JSON.parse(data))
    .catch(err => console.log(err));
  }

  private retreiveTag() {
    this.http.get(environment.apiUrl + this.topic + '/tag')
    .toPromise()
    .then(response => response.text())
    .then(data => this.tags = JSON.parse(data))
    .catch(err => console.log(err));
  }
}