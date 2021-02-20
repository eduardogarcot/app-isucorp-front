import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {InputItemsValidator} from '../common/Inputs.validator';
import {ContactService} from '../services/contact.service';
import {ReservationService} from '../services/reservation.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})

export class ReservationFormComponent implements OnInit {

  constructor(
    private service: ContactService,
    private serviceR: ReservationService,
    private route: ActivatedRoute,
    private  router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  private parameter: number;
  form = new FormGroup( {
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, InputItemsValidator.isAPhoneNumber,
                                                            Validators.minLength(7), Validators.maxLength(12)]),
    reservationDate: new FormControl(null, [Validators.required, InputItemsValidator.isDateAfterToday])
  });

  onSubmit(): void {
      this.service.getContacts()
        .subscribe(
          response => {
            let idContact = -1;
            Object.keys(response).some(
              (key) => {
                const item = response[key];
                if (item.name === this.form.get('name').value && item.phoneNumber === Number(this.form.get('phoneNumber').value)) {
                  idContact = item.contactId;
                  return true;
                }
              });
            if (idContact > 0) {
              const reservation = {
                contactId: idContact,
                reservationDate: this.form.get('reservationDate').value
              };
              if (this.parameter === 0) {
                this.serviceR.postReservation(reservation)
                  .subscribe(
                    () => {
                      this.router.navigateByUrl('/');
                    },
                    error1 => {
                      if (error1.status === 400 ){
                        alert('An error has occurred, please check the contact name and the phone number'); }
                      else { alert('An unexpected error occurred.'); }
                    });
              }
              else {
                this.serviceR.updateReservation(reservation, this.parameter)
                  .subscribe(
                    () => {
                      this.router.navigateByUrl('/');
                    },
                    error1 => {
                      if (error1.status === 400 ) {
                        alert('An error occurred, please check the contact name and the phone number'); }
                      else { alert('An unexpected error occurred.'); }
                    });
              }
            } else {
              // tslint:disable-next-line:max-line-length
              alert('This pair Contact Name and Contact Number doesn\'t exist in the system. Please add the current Contact and try again.');
            }
          }
        );
  }

  ngOnInit(): void {
    this.parameter = this.route.snapshot.paramMap.get('reservationId') === 'new' ? 0 : Number(this.route.snapshot.paramMap.get('reservationId'));
    if (this.parameter === 0) {return ; }
    this.serviceR.getReservation(this.parameter)
      .subscribe(
        response => {
          this.service.getContact(response['contactId'])
            .subscribe(
              response2 => {
                this.form.setValue(
                  {
                    name : response2['name'],
                    phoneNumber : response2['phoneNumber'],
                    reservationDate : response['reservationDate'].substring(0, 10)
                  });
              },
              () => {
                alert('An unexpected error occurred.'); }
            );
          },
        error1 => {
          if (error1.status === 404) { alert('This reservation doesn\'t exist in the System.'); }
          else {alert('An unexpected error occurred.'); }
          this.router.navigateByUrl('/');
        }
      );
  }
}

