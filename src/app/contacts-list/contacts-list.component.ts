import {Component, Input, OnInit} from '@angular/core';
import {Contact} from '../common/contact';
import _ from 'underscore';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})

export class ContactsListComponent implements OnInit{
  public contacts: (Contact)[];
  public contactsToShow: (Contact) [];
  @Input() numberOfItemsPerPage: number;
  public numberOfPages: number;
  form = new FormGroup({sortOrder: new FormControl('', )});

  onSubmit(): void{
    console.log(this.form);
    const reverse = (this.form.get('sortOrder').value as string).indexOf(' ') >= 0;
    console.log(reverse);
  }

  sortItemsBy(items: any[], category: string, reverse: boolean = false): any[]{
     return reverse ? _.sortBy( items, category ).reverse() : _.sortBy( items, category );
  }

  isReverseSort(): boolean{
    return (this.form.get('sortOrder').value as string).indexOf(' ') >= 0;
  }
  selectItemToShow(items: any[], pageNumber: number): any[] {
    const newContacts: (any)[] = [];
    for (let i = (pageNumber - 1) * this.numberOfItemsPerPage ; i < this.numberOfItemsPerPage ; i++)
    {
      if (i === items.length) { break; }
      newContacts.push(items[i]);
    }
    return this.sortItemsBy(newContacts, 'birthDate', this.isReverseSort());
  }

  ngOnInit(): void {
    this.contacts = [
      {name: 'Felipe Garcia', phoneNumber: 18008976895, contactType: 'Contact Type 1', birthDate: new Date(1996, 11, 27)},
      {name: 'Roberto Otaola', phoneNumber: 18008976895, contactType: 'Contact Type 2', birthDate: new Date(1996, 11, 17)},
      {name: 'Carlo Montalvo', phoneNumber: 18008976895, contactType: 'Contact Type 1', birthDate: new Date(1996, 11, 11)},
      {name: 'Magaly Perez', phoneNumber: 18008976895, contactType: 'Contact Type 3', birthDate: new Date(1996, 11, 17)},
      {name: 'Yulieski Gonzalez', phoneNumber: 18008976895, contactType: 'Contact Type 4', birthDate: new Date(2006, 11, 7)}
    ];
    this.contactsToShow = this.selectItemToShow(this.contacts, 1);
  }
}
