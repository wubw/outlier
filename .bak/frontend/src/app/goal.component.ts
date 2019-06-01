import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { BaseComponent } from './base.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
})
export class GoalComponent extends BaseComponent{
  protected topic = 'goal';

  constructor(http: Http, authservice: AuthService) {
    super(http, authservice);
    this.retrieveDescription();
  }
}