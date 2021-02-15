import { Component, OnInit } from '@angular/core';
import {Contact} from '../common/contact';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit{
  public contacts: ( Contact )[];

  ngOnInit(): void {
    this.contacts = [
      {name: 'Felipe Garcia', phoneNumber: 18008976895, contactType: 'Contact Type 1', birthDate: new Date(1996, 11, 17)},
      {name: 'Roberto Otaola', phoneNumber: 18008976895, contactType: 'Contact Type 2', birthDate: new Date(1996, 11, 17)},
      {name: 'Carlo Montalvo', phoneNumber: 18008976895, contactType: 'Contact Type 1', birthDate: new Date(1996, 11, 17)},
      {name: 'Magaly Perez', phoneNumber: 18008976895, contactType: 'Contact Type 3', birthDate: new Date(1996, 11, 17)},
      {name: 'Yulieski Gonzalez', phoneNumber: 18008976895, contactType: 'Contact Type 4', birthDate: new Date(1996, 11, 17)}
    ];
  }


}
