import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {InputItemsValidator} from '../common/Inputs.validator';
import {ContactService} from '../services/contact.service';
import {ReservationService} from '../services/reservation.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})

export class ReservationFormComponent {

  constructor(private service: ContactService, private serviceR: ReservationService) { }

  form = new FormGroup( {
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, InputItemsValidator.isAPhoneNumber,
                                                            Validators.minLength(7), Validators.maxLength(12)]),
    reservationDate: new FormControl(null, [Validators.required])
  });

  onSubmit(): void {
    // tslint:disable-next-line:max-line-length
    console.log('Type of Date : ' + typeof this.form.get('reservationDate').value + '  Value of Date : ' + this.form.get('reservationDate').value);
    this.service.getContacts()
      .subscribe(
        response => {
          let idContact = -1;
          Object.keys(response).some(
            (key) => {
              const item = response[key];
              if (item.name === this.form.get('name').value && item.phoneNumber === Number(this.form.get('phoneNumber').value))
              {
                idContact = item.contactId;
                return true;
              }
            });
          if (idContact > 0) {
            const reservation = {
              contactId: idContact,
              reservationDate: this.form.get('reservationDate').value
            };
            this.serviceR.postReservation(reservation)
              .subscribe(
                response1 => {
                  console.log(response1);
                }
              );
          }
          else {alert('This pair Contact Name and Contact Number doesn\'t exist in the system. Please add the current Contact and try again.'); }
        }
      );
  }

}

