import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VulnComponent } from './vuln/vuln.component';
import { Stored1Component } from './stored1/stored1.component';
import { Stored2Component } from './stored2/stored2.component';
import { Stored3Component } from './stored3/stored3.component';

@NgModule({
  declarations: [
    AppComponent,
    VulnComponent,
    Stored1Component,
    Stored2Component,
    Stored3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
