import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {InputItemsValidator} from './contactInputs.validator';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})

export class ContactFormComponent implements OnInit {
  public Editor = ClassicEditor;

  form = new FormGroup( {
    name: new FormControl('', [Validators.required]),
    contactType: new FormControl('', [Validators.required]),
    // tslint:disable-next-line:max-line-length
    phoneNumber: new FormControl('', [Validators.required, InputItemsValidator.isAPhoneNumber, Validators.minLength(7), Validators.maxLength(12)]),
    birthDate: new FormControl('', [Validators.required, InputItemsValidator.isValidBirthDate])
  });

  onSubmit(): void {
    const item = {
      name: this.form.get('name').value,
      contactType: this.form.get('contactType').value,
      phoneNumber: this.form.get('phoneNumber').value,
      birthDate: new Date((this.form.get('birthDate').value as string))
    };
    console.log(item);
    this.http.post('https://localhost:5001/api/contacts', item)
      .subscribe( response => {
        console.log(response);
      });
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

}
