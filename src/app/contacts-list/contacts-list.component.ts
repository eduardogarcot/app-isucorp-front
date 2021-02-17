import {Component, Input, OnInit} from '@angular/core';
import {Contact} from '../common/contact';
import _ from 'underscore';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
const urlPath = 'https://localhost:5001/api/contacts';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})

export class ContactsListComponent implements OnInit{

  constructor(private http: HttpClient){
    this.http.get(urlPath).subscribe(response => {
      this.contacts = Object.keys(response).map(key => {
        const item = response[key];
        item.birthDate = new Date((response[key].birthDate).substring(0, 10) );
        return (item as Contact);
        });
      this.numberOfItemsPerPage = 5;
      this.contactsToShow = this.selectItemToShow(this.contacts, 1);
      console.log(this.contactsToShow);
    });
    }
  public contacts: object[];
  public contactsToShow: (Contact) [];
  // @Input()
  private numberOfItemsPerPage: number ;
  public numberOfPages: number;
  form = new FormGroup({sortOrder: new FormControl('', )});

  static sortItemsBy(items: any[], category: string, reverse: boolean = false): any[]{
     return reverse ? _.sortBy( items, category ).reverse() : _.sortBy( items, category );
  }

  onDeleteContact(data): void {
    console.log(data);
    const newURL = urlPath + '/' + data.contactId;
    console.log('Length Before' + this.contacts.length);
    this.http.delete(newURL).subscribe(() => {
      const index = this.contacts.indexOf(data);
      this.contacts.splice(index, 1);
    });
    console.log('Length After' + this.contacts.length);
  }
  onSubmit(): void{
    console.log(this.form);
    const reverse = (this.form.get('sortOrder').value as string).indexOf(' ') >= 0;
    console.log(reverse);
  }

  isReverseSort(): boolean{
    return (this.form.get('sortOrder').value as string).indexOf(' ') >= 0;
  }

  selectItemToShow(items: object [], pageNumber: number): any[] {
    const newContacts: (any)[] = [];
    for (let i = (pageNumber - 1) * this.numberOfItemsPerPage ; i < this.numberOfItemsPerPage ; i++)
    {
      if (i === items.length) { break; }
      newContacts.push(items[i]);
    }
    return ContactsListComponent.sortItemsBy(newContacts, 'birthDate', this.isReverseSort());
  }

  ngOnInit(): void {
  }
}
