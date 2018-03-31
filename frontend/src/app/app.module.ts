import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TimeComponent } from './time.component';
import { GoalComponent } from './goal.component';
import { KnowledgeComponent } from './knowledge.component';
import { NetworkComponent } from './network.component';
import { UserService } from './user.service';

const appRoutes: Routes = [
  { path: '', component: TimeComponent },
  { path: 'time', component: TimeComponent },
  { path: 'goal', component: GoalComponent },
  { path: 'knowledge', component: KnowledgeComponent },
  { path: 'network', component: NetworkComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TimeComponent,
    GoalComponent,
    KnowledgeComponent,
    NetworkComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
