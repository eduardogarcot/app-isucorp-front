import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Contact} from '../common/contact';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent {
  @Output() deleteContact = new EventEmitter<number>();
  @Input() contact: Contact;

  onDeleteContact(data: number): void {
    this.deleteContact.emit(data);
  }
}
