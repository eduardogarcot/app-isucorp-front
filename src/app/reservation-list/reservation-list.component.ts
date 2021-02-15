import { Component, OnInit } from '@angular/core';
import {Reservation} from '../common/reservation';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  public reservations: ( Reservation)[];
  ngOnInit(): void {
    this.reservations = [
      {id: 1, name: 'Noa La Goa', reservationDate : new Date(2020, 12, 26, 18, 0), isfavorite: true, rate: 5},
      {id: 2, name: 'Rapunzel', reservationDate : new Date(2020, 12, 26, 18, 0), isfavorite: false, rate: 5},
      {id: 3, name: '45 Grandes Estafas', reservationDate : new Date(2020, 12, 26, 18, 0), isfavorite: true, rate: 5},
      {id: 4, name: 'La Estrellita', reservationDate : new Date(2020, 12, 26, 18, 0), isfavorite: false, rate: 5},
      {id: 5, name: 'Rocio Jurado', reservationDate : new Date(2020, 12, 26, 18, 0), isfavorite: true, rate: 5},
      {id: 6, name: 'Maritza Escobar', reservationDate : new Date(2020, 12, 26, 18, 0), isfavorite: true, rate: 5},
    ];
  }

}
