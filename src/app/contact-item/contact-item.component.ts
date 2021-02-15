import {Component, Input, OnInit} from '@angular/core';
import {Contact} from '../common/contact';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent {

  @Input() contact: Contact;

}
