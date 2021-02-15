import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {InputItemsValidator} from './contactInputs.validator';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  form = new FormGroup( {
    name: new FormControl('', [Validators.required]),
    contactType: new FormControl('', [Validators.required]),
    // tslint:disable-next-line:max-line-length
    phoneNumber: new FormControl('', [Validators.required, InputItemsValidator.isAPhoneNumber, Validators.minLength(7), Validators.maxLength(12)]),
    birthDate: new FormControl('', [Validators.required, InputItemsValidator.isValidBirthDate])
  });

  onSubmit(): void {
    console.log(this.form.getRawValue());
    console.log(this.form);
    console.log(this.form.valid);

    // for (const item of this.form.controls){
    //   for()
    // }
  }

  constructor() { }

  ngOnInit(): void {

  }

}
