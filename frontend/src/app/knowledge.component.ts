import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { BaseComponent } from './base.component';

@Component({
  selector: 'app-knowledge',
  templateUrl: './knowledge.component.html',
})
export class KnowledgeComponent extends BaseComponent {
  protected topic = 'knowledge';

  constructor(http: Http) {
    super(http);
    this.retrieveDescription();
  }
}