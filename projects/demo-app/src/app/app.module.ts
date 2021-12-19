import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxNavigationTriggerModule } from 'ngx-navigation-trigger';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxNavigationTriggerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
