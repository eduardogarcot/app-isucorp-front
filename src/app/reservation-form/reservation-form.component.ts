import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {InputItemsValidator} from '../common/Inputs.validator';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})


export class ReservationFormComponent {
  constructor(private http: HttpClient) { }

  form = new FormGroup( {
    name: new FormControl('', [Validators.required]),
    // tslint:disable-next-line:max-line-length
    phoneNumber: new FormControl('', [Validators.required, InputItemsValidator.isAPhoneNumber, Validators.minLength(7), Validators.maxLength(12)]),
    reservationDate: new FormControl('', [Validators.required])
  });

  onSubmit(): void {
  const item = {
      contactId: 12,
      rate: 1,
      isFavorite: false,
      reservationDate: new Date((this.form.get('reservationDate').value as string))
    };
  console.log(item);
  this.http.post('https://localhost:5001/api/reservations', item)
      .subscribe( response => {
        console.log(response);
    });
  }

  isValidContact(): number {
    let isValid = -1;
    this.http.get('https://localhost:5001/api/contacts')
      .subscribe(response => {
        Object.keys(response).map(key => {
          let item = response[key];
          // tslint:disable-next-line:max-line-length
          if (item['name'] !== this.form.get('name').value && item['phoneNumber'] !== this.form.get('phoneNumber').value) { isValid = item['contactId']; }
        });
      });
    return isValid;
  }

  // onCheckMatch(){
  //   const contacts = this.http.get('https://localhost:5001/api/contacts')
  //     .subscribe()
  // }
}

