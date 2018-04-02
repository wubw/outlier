import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { TimeComponent } from './time.component';
import { GoalComponent } from './goal.component';
import { KnowledgeComponent } from './knowledge.component';
import { NetworkComponent } from './network.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';

import { JwtHelper } from 'angular2-jwt';

const appRoutes: Routes = [
  { path: '', component: TimeComponent, canActivate: [AuthGuardService]  },
  { path: 'time', component: TimeComponent, canActivate: [AuthGuardService] },
  { path: 'goal', component: GoalComponent, canActivate: [AuthGuardService] },
  { path: 'knowledge', component: KnowledgeComponent, canActivate: [AuthGuardService] },
  { path: 'network', component: NetworkComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TimeComponent,
    GoalComponent,
    KnowledgeComponent,
    NetworkComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AuthGuardService,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [AuthService, JwtHelper],
  bootstrap: [AppComponent]
})
export class AppModule { }
