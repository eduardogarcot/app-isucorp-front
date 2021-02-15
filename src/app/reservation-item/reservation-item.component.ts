import {Component, Input, OnInit} from '@angular/core';
import {Reservation} from '../common/reservation';

@Component({
  selector: 'app-reservation-item',
  templateUrl: './reservation-item.component.html',
  styleUrls: ['./reservation-item.component.css']
})
export class ReservationItemComponent{

  @Input () reservation: Reservation;
}
