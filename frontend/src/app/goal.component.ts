import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { BaseComponent } from './base.component';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
})
export class GoalComponent extends BaseComponent{
  protected topic = 'goal';

  constructor(http: Http) {
    super(http);
    this.retrieveDescription();
  }
}