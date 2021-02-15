import { Component } from '@angular/core';
import {Contact} from './common/contact';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  contact: Contact = {name: 'Felipe Garcia', phoneNumber: 18008976895, contactType: 'Contact Type 1', birthDate: new Date(1996, 11, 17)};
}
