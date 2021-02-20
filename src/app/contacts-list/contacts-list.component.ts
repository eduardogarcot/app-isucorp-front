import {Component, Input, OnInit} from '@angular/core';
import {Contact} from '../common/contact';
import _ from 'underscore';
import {FormControl, FormGroup} from '@angular/forms';
import {ContactService} from '../services/contact.service';
import {ArrayManipulations} from '../common/listsManipulations';


@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})

export class ContactsListComponent implements OnInit{

  constructor(private service: ContactService){}

  public contacts: Contact[];
  form = new FormGroup({sortOrder: new FormControl('', )});

  onDeleteContact(contact): void {
    this.service.deleteContact(contact.contactId)
      .subscribe(
        () => {
          const index = this.contacts.indexOf(contact);
          this.contacts.splice(index, 1);
          console.log(this.contacts);
        },
        error => {
          if (error.status === 404) { alert('This contact has already been deleted'); }
          else {alert('An unexpected error occurred.'); }
        });
  }

  /*
  isReverseSort(): boolean{
    return (this.form.get('sortOrder').value as string).indexOf(' ') >= 0;
  }

  static sortItemsBy(items: any[], category: string, reverse: boolean = false): any[]{
    return reverse ? _.sortBy( items, category ).reverse() : _.sortBy( items, category );
  }

  selectItemToShow(items: object [], pageNumber: number): any[] {
    const newContacts: (any)[] = [];
    for (let i = (pageNumber - 1) * this.numberOfItemsPerPage ; i < this.numberOfItemsPerPage ; i++)
    {
      if (i === items.length) { break; }
      newContacts.push(items[i]);
    }
    return ContactsListComponent.sortItemsBy(newContacts, 'birthDate', this.isReverseSort());
  }*/

  ngOnInit(): void {
    this.service.getContacts()
      .subscribe(
        response => {
          console.log(response);
          this.contacts = Object.keys(response).map(key => {
            const item = response[key];
            item.birthDate = new Date((response[key].birthDate).substring(0, 10));
            return (item as Contact);
          });
          this.contacts = ArrayManipulations.sortItemsBy(this.contacts, 'birthDate');
          console.log(this.contacts);
      });
  }
    // LOGIC TO PAGINATE (SEE LATER)
    // this.numberOfItemsPerPage = 5;
    // this.contactsToShow = this.selectItemToShow(this.contacts, 1);
    // console.log(this.contactsToShow);
    // public contactsToShow: (Contact) [];
    // @Input()
    // private numberOfItemsPerPage: number ;
    // public numberOfPages: number;

}
