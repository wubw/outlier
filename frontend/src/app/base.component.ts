import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/toPromise';

@Component({})
export abstract class BaseComponent {
    private description: string;
    protected abstract topic: string;
    
    constructor(protected http: Http, protected authservice: AuthService) {
    }

    protected retrieveDescription() {
        this.http.get(environment.apiUrl + this.topic + '/description', { headers: this.getHttpHeaders()})
          .toPromise()
          .then(response => response.text())
          .then(data => this.description = JSON.parse(data))
          .catch(err => console.log(err));
    }

    protected getHttpHeaders(): Headers {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json-patch+json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.authservice.access_token);
        return headers;
    }
}