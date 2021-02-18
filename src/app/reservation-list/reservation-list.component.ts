import {Component, OnInit} from '@angular/core';
import {Reservation} from '../common/reservation';
import {FormControl, FormGroup} from '@angular/forms';
import {ReservationService} from '../services/reservation.service';
import {ContactService} from '../services/contact.service';


@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  constructor(private service: ReservationService, private serviceC: ContactService) {
  }

  public reservations: Reservation[];
  form = new FormGroup({sortOrder: new FormControl('')});

  onDeleteReservation(reservation): void {
    this.service.deleteReservation(reservation.reservationId)
      .subscribe(
        () => {
        const index = this.reservations.indexOf(reservation);
        this.reservations.splice(index, 1);
      });
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
    }


    //  LOGIC FOR PAGINATION
    // @Input()
    // public reservationsToShow: Reservation[];
    // private numberOfItemsPerPage: 5;
    // public numberOfPages: number;
    /*static sortItemsBy(items: any[], category: string, reverse: boolean = false): Reservation[]{
    return reverse ? _.sortBy( items, category ).reverse() : _.sortBy( items, category );
  }
  /*selectItemToShow(items: Reservation [], pageNumber: number): any[] {
      const newReservations: Reservation[] = [];
      console.log(items);
      for (let i = (pageNumber - 1) * this.numberOfItemsPerPage ; i < this.numberOfItemsPerPage ; i++)
      {
        if (items[i] !== null ) {newReservations.push(items[i]); }
      }
      const category = (this.form.get('sortOrder').value.toString().split(' ')[0]);
      console.log(category);
      return ReservationListComponent.sortItemsBy(newReservations, category !== ''  ? category : 'name' , this.isReverseSort());
    }

  isReverseSort(): boolean{
    return (this.form.get('sortOrder').value as string).indexOf(' ') >= 0;
  }

  updateData(): void{
    this.reservationsToShow = this.selectItemToShow(this.reservations, 1);
    console.log(this.reservationsToShow);
  }*/

}
