import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ContactItemComponent } from './contact-item/contact-item.component';
import { ReservationItemComponent } from './reservation-item/reservation-item.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {HttpClientModule} from '@angular/common/http';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import {RouterModule} from '@angular/router';
import {ContactService} from './services/contact.service';
import {ReservationService} from './services/reservation.service';

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ContactItemComponent,
    ReservationItemComponent,
    ContactsListComponent,
    ReservationListComponent,
    ContactFormComponent,
    ReservationFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CKEditorModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        { path: 'contacts-list', component: ContactsListComponent},
        { path: '', component: ReservationListComponent},
        { path: 'contact-form/:contactId', component: ContactFormComponent},
        { path: 'reservation-form/:reservationId', component: ReservationFormComponent}
      ]
    )
    ],
  providers: [
    ContactService,
    ReservationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
