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
  public routerLink: string ;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.href = this.router.url;
    if (this.href === '/reservation-form') {
      this.href = 'Create Reservation';
      this.buttonLabel = 'Reservations List';
      this.routerLink = 'reservations-list';
    } else if (this.href === '/') {
      this.href = 'Reservations List';
      this.buttonLabel = 'Create Reservation';
      this.routerLink = '/reservation-form';
    } else if (this.href === '/reservation-form') {
      this.href = 'Create a Reservation';
      this.buttonLabel = 'Create a Contact';
      this.routerLink = '/contact-form';
    } else if (this.href === '/contacts-list') {
      this.href = 'Contacts List';
      this.buttonLabel = 'Create a Reservation';
      this.routerLink = '/contact-list';
    }
  }
}
