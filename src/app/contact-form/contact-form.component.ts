import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  form = new FormGroup( {
    name: new FormControl('', [Validators.required]),
    contactType: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required])
  });

  onSubmit(): void {
    console.log(this.form.getRawValue());
    console.log(this.form.hasError);
    this.form.get('name').setValue('Federico');
  }

  constructor() { }

  ngOnInit(): void {

  }

}
