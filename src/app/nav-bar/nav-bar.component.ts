import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  public href = '';
  public buttonLabel = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.href = this.router.url;
    if (this.href === '/createreservation') {
      this.href = 'Create Reservation';
      this.buttonLabel = 'Reservations List';
    } else if (this.href === '/') {
      this.href = 'Reservations List';
      this.buttonLabel = 'Create Resrevation';
    } else if (this.href === '/createcontact') {
      this.href = 'Reservations List';
      this.buttonLabel = 'Contact List';
    } else if (this.href === '/contactslist') {
      this.href = 'Contacts List';
      this.buttonLabel = 'CreateContact';
    }
  }
}
