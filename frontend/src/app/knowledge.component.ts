import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { BaseComponent } from './base.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-knowledge',
  templateUrl: './knowledge.component.html',
})
export class KnowledgeComponent extends BaseComponent {
  protected topic = 'knowledge';

  constructor(http: Http, authservice: AuthService) {
    super(http, authservice);
    this.retrieveDescription();
  }
}