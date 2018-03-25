import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/toPromise';

@Component({  
    templateUrl: './base.component.html'
})
export abstract class BaseComponent {
    private description: string;
    protected abstract topic: string;
    
    constructor(private http: Http) {
    }

    protected retrieveDescription() {
        this.http.get(environment.apiUrl + this.topic + '/description')
          .toPromise()
          .then(response => this.description = response.text())
          .catch(err => console.log(err));
    }
}