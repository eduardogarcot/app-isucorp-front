import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Contact} from '../common/contact';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent {
  @Output() deleteContact = new EventEmitter<Contact>();
  @Input() contact: Contact;

  onDeleteContact(data: Contact): void {
    this.deleteContact.emit(data);
  }

}
