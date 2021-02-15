import { Component } from '@angular/core';
import {Contact} from './common/contact';
import {Reservation} from './common/reservation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  contact: Contact = {
    name: 'Felipe Garcia',
    phoneNumber: 18008976895,
    contactType: 'Contact Type 1',
    birthDate: new Date(1996, 11, 17)
  };
  reservation: Reservation = {
    id: 1,
    name: 'Noa La Goa',
    reservationDate : new Date(2020, 12, 26, 18),
    isfavorite: true,
    rate: 5
  };
}
