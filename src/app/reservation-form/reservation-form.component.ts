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
    reservationDate: new FormControl('', [Validators.required, InputItemsValidator.isDateBeforeToday])
  });

  onSubmit(): void {
  const item = {
      contactId: 1,
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
  // onCheckMatch(){
  //   const contacts = this.http.get('https://localhost:5001/api/contacts')
  //     .subscribe()
  // }
}

