import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ContactItemComponent } from './contact-item/contact-item.component';
import { ReservationItemComponent } from './reservation-item/reservation-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ContactItemComponent,
    ReservationItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
