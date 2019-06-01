import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) {
    this.http
      .get(`${environment.api_url}/test`).subscribe(res => {
        this.test_value = res.toString();
      })
  }

  title = 'frontend';
  test_value = '';
}
