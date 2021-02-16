import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {InputItemsValidator} from '../contact-form/contactInputs.validator';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})


export class ReservationFormComponent {
  form = new FormGroup( {
    name: new FormControl('', [Validators.required]),
    // isFavorite: new FormControl(''),
    // rate: new FormControl('',[Validators.min(1), Validators.max(5)]),
    reservationDate: new FormControl('', [Validators.required, InputItemsValidator.isValidBirthDate])
  });

  onSubmit(): void {
    const item = {
      contactId: 1,
      rate: 1,
      isFavorite: false,
      reservationDate: new Date((this.form.get('reservationDate').value as string))
    };
    console.log(item);
    // this.http.post('https://localhost:5001/api/reservations', item)
    //   .subscribe( response => {
    //     console.log(response);
    //   });
  }

  constructor(private http: HttpClient) { }

}

