import {Component, Input} from '@angular/core';
import {Reservation} from '../common/reservation';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import _ from 'underscore';

const urlPath = 'https://localhost:5001/api/reservations';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent{

  constructor(private http: HttpClient){
    this.http.get(urlPath).subscribe(response => {
      this.reservations = Object.keys(response).map(key => {
        console.log(response);
        return this.getReservation(response[key]) as Reservation;
      });
      this.reservationsToShow = this.selectItemToShow(this.reservations, 1);
    });
  }

  public reservations: object[];
  public reservationsToShow: (Reservation) [];
  @Input() numberOfItemsPerPage: number;
  public numberOfPages: number;
  form = new FormGroup({sortOrder: new FormControl('', )});

  static sortItemsBy(items: any[], category: string, reverse: boolean = false): any[]{
    return reverse ? _.sortBy( items, category ).reverse() : _.sortBy( items, category );
  }
  getReservation(item: object): Reservation{
    return {
        reservationId: item.reservationId,
        contactName: 'LOGIC TO GET BY ID',
        reservationDate : new Date((item.reservationDate as string).substring(0, 10)),
        isFavorite: item.isFavorite,
        rate: item.rate,
        contactId: item.contactId,
        cratedDate: new Date((item.cratedDate as string).substring(0, 10))
      };
  }

  isReverseSort(): boolean{
    return (this.form.get('sortOrder').value as string).indexOf(' ') >= 0;
  }

  onDeleteReservation(data): void {
    console.log(data);
    // const newURL = urlPath + '/' + data.reservationId;
    // this.http.delete(newURL).subscribe(() => {
    // const index = this.reservations.indexOf(data);
    // this.reservations.splice(index, 1);
    // });
  }

  selectItemToShow(items: object [], pageNumber: number): any[] {
    const newReservations: (any)[] = [];
    for (let i = (pageNumber - 1) * this.numberOfItemsPerPage ; i < this.numberOfItemsPerPage ; i++)
    {
      if (i === items.length) { break; }
      newReservations.push(items[i]);
    }
    //  DEFINIR CATEGORIA DE ORDENAMIENTO
    return ReservationListComponent.sortItemsBy(newReservations, 'birthDate', this.isReverseSort());
  }
}

