import { Component } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
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

  private inputcategory: string;
  private inputtag: string;

  constructor(http: Http) {
    super(http);
    this.retrieveDescription();
    this.retrieveCategory();
    this.retrieveTag();
  }

  private retrieveCategory() {
    this.http.get(environment.apiUrl + this.topic + '/category')
      .toPromise()
      .then(response => response.text())
      .then(data => this.categories = JSON.parse(data))
      .catch(err => console.log(err));
  }

  private retrieveTag() {
    this.http.get(environment.apiUrl + this.topic + '/tag')
      .toPromise()
      .then(response => response.text())
      .then(data => this.tags = JSON.parse(data))
      .catch(err => console.log(err));
  }

  private addCategory() {
    if (this.categories.includes(this.inputcategory)) {
      alert('Category ' + this.inputcategory + ' exists.');
      return;
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json-patch+json');
    headers.append('Accept', 'application/json');

    this.http.post(environment.apiUrl + this.topic + '/category',
      JSON.stringify(this.inputcategory), { headers: headers })
      .subscribe(() => {
          this.retrieveCategory();
          alert('New category ' + this.inputcategory + ' has been created.');
          this.inputcategory = '';
        }, err => console.log(err));
  }

  private deleteCategory() {
    let id = this.categories.indexOf(this.inputcategory);
    if (id < 0) {
      alert('Category ' + this.inputcategory + ' does not exist.');
      return;
    }

    this.http.delete(environment.apiUrl + this.topic + '/category/' + id)
      .toPromise()
      .then(() => {
        this.retrieveCategory();
        alert('Category ' + this.inputcategory + ' has been deleted.');
        this.inputcategory = '';
      })
      .catch(err => console.log(err));
  }

  private addTag() {
    if (this.tags.includes(this.inputtag)) {
      alert('Tag ' + this.inputtag + ' exists.');
      return;
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json-patch+json');
    headers.append('Accept', 'application/json');

    this.http.post(environment.apiUrl + this.topic + '/tag',
      JSON.stringify(this.inputtag), { headers: headers })
      .subscribe(() => {
          this.retrieveTag();
          alert('New tag ' + this.inputtag + ' has been created.');
          this.inputtag = '';
        }, err => console.log(err));
  }

  private deleteTag() {
    let id = this.tags.indexOf(this.inputtag);
    if (id < 0) {
      alert('Tag ' + this.inputtag + ' does not exist.');
      return;
    }

    this.http.delete(environment.apiUrl + this.topic + '/tag/' + id)
      .toPromise()
      .then(() => {
        this.retrieveTag();
        alert('Category ' + this.inputtag + ' has been deleted.');
        this.inputtag = '';
      })
      .catch(err => console.log(err));
  }
}