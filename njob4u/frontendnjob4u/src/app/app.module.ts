import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { createCustomElement } from '@angular/elements';

import { NJob4UComponent } from './njob4u.component';

@NgModule({
  declarations: [
    NJob4UComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  entryComponents: [NJob4UComponent]
})
export class NJob4UModule { 
  constructor(private injector: Injector) {
    const productHeader = createCustomElement(NJob4UComponent, { injector });
    customElements.define('njob4u-root', productHeader);
  }

  ngDoBootstrap() {}
}
