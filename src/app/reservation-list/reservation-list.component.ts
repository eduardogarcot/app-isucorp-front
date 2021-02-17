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

  public flag = false;
  public reservations: Reservation[];
  public reservationsToShow: Reservation[];
  // @Input()
  private numberOfItemsPerPage: 5;
  public numberOfPages: number;
  form = new FormGroup({sortOrder: new FormControl('', )});

  static sortItemsBy(items: any[], category: string, reverse: boolean = false): Reservation[]{
    return reverse ? _.sortBy( items, category ).reverse() : _.sortBy( items, category );
  }

  constructor(private http: HttpClient){
    this.reservations = [] ;
    this.numberOfItemsPerPage = 5;
    this.http.get(urlPath).subscribe(response => {
      let value = Object.keys(response).length;
      Object.keys(response).map(key => {
        const item = response[key];
        const path = 'https://localhost:5001/api/contacts/' + item['contactId'];
        this.http.get(path)
          .subscribe(response => {
            // tslint:disable-next-line:max-line-length
            const reservation = {contactName: response['name'], reservationId: item.reservationId, reservationDate : new Date((item.reservationDate as string).substring(0, 10)),
            isFavorite: item.isFavorite, rate: item.rate, contactId: item.contactId,
            cratedDate: new Date((item.cratedDate as string).substring(0, 10))};
            this.reservations.push(reservation as Reservation);
            value--;
            if (value === 0) {
              console.log(this.reservations);
              this.updateData();
            }
          });
      });
    });
  }

  isReverseSort(): boolean{
    return (this.form.get('sortOrder').value as string).indexOf(' ') >= 0;
  }

  updateData(): void{
    this.reservationsToShow = this.selectItemToShow(this.reservations, 1);
    console.log(this.reservationsToShow);
  }

  onDeleteReservation(data): void {
    const newURL = urlPath + '/' + data.reservationId;
    this.http.delete(newURL).subscribe(() => {
      const index = this.reservations.indexOf(data);
      this.reservations.splice(index, 1);
      this.updateData();
    });
  }

  selectItemToShow(items: Reservation [], pageNumber: number): any[] {
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
}

