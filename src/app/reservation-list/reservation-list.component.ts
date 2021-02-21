import {Component, OnInit} from '@angular/core';
import {Reservation} from '../common/reservation';
import {FormControl, FormGroup} from '@angular/forms';
import {ReservationService} from '../services/reservation.service';
import {ContactService} from '../services/contact.service';
import {ArrayManipulations} from '../common/listsManipulations';


@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  constructor(private service: ReservationService, private serviceC: ContactService) {
    this.numberOfItemsInAPage = 2;
    this.currentPage = 1;
  }

  public numberOfItemsInAPage: number;
  public currentPage: number ;
  public reservations: Reservation[];
  public reservationsToPage: Reservation[];
  public form: FormGroup;
  public SortCategory = [
    {value: 'name',   label: 'By Name Ascending'},
    {value: 'name r', label: 'By Name Descending'},
    {value: 'reservationDate',   label: 'By Date Ascending'},
    {value: 'reservationDate r', label: 'By Date Descending'},
    {value: 'rate', label: 'By Rate Ascending'},
    {value: 'rate r', label: 'By Rate Descending'}
  ];

  onDeleteReservation(reservation): void {
    this.service.deleteReservation(reservation.reservationId)
      .subscribe(
        () => {
        const index = this.reservations.indexOf(reservation);
        this.reservations.splice(index, 1);
      });
  }

  onPaginateTo(nextPage: number): void{
    this.currentPage = nextPage;
    this.reservationsToPage = ArrayManipulations.selectItemsFromPage(this.reservations, this.numberOfItemsInAPage, nextPage);
  }

  onFavoriteReservation(reservation): void{
    reservation.isFavorite = !reservation.isFavorite;
    reservation.reservationDate.setHours((reservation.reservationDate.getHours() - 5) % 24);
    this.service.updateReservation(reservation, reservation.reservationId)
      .subscribe(
        () => {},
        () => {
          reservation.isFavorite = !reservation.isFavorite;
          alert('An unexpected error occurred');
        });
  }

  onRateReservation(reservation): void{
    const oldRate = reservation.rate;
    reservation.rate = (oldRate + 1) % 5;
    this.service.updateReservation(reservation, reservation.reservationId)
      .subscribe(
        () => {},
        () => {
          reservation.rate = oldRate;
          alert('An unexpected error occurred');
        });
  }

  // tslint:disable-next-line:max-line-length
  ngOnInit(): void {
    this.service.getReservations()
      .subscribe(
        response => {
          let value = Object.keys(response).length;
          const newReservations = [];
          Object.keys(response).map(
            key => {
              const item = response[key];
              this.serviceC.getContact(item.contactId)
                .subscribe(
                  response2 => {
                    const reservation = {
                        contactName: response2['name'], reservationId: item.reservationId,
                        reservationDate : new Date(item.reservationDate),
                        isFavorite: item.isFavorite, rate: item.rate, contactId: item.contactId};
                    newReservations.push(reservation as Reservation);
                    value--;
                    if (value === 0) {
                      this.reservations = newReservations;
                      // tslint:disable-next-line:max-line-length
                      this.reservationsToPage = ArrayManipulations.selectItemsFromPage(this.reservations, this.numberOfItemsInAPage, this.currentPage);
                    }
                  },
                  () => {
                    alert('An unexpected error occurred');
                  }
                  );
            });
        },
        () => {
          alert('An Unexpected error occurred');
        });
    this.form = new FormGroup({sortOrder: new FormControl()});
    this.form.controls['sortOrder'].valueChanges.subscribe(val => {
      this.reservations = ArrayManipulations.sortItemsBy(this.reservations, val);
      // tslint:disable-next-line:max-line-length
      this.reservationsToPage = ArrayManipulations.selectItemsFromPage(this.reservations, this.numberOfItemsInAPage, this.currentPage);
    });
    }

}
