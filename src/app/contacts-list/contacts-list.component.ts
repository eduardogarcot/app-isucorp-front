import {Component, OnInit} from '@angular/core';
import {Contact} from '../common/contact';
import {FormControl, FormGroup} from '@angular/forms';
import {ContactService} from '../services/contact.service';
import {ArrayManipulations} from '../common/listsManipulations';


@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})

export class ContactsListComponent implements OnInit{

  constructor(private service: ContactService){
    this.numberOfItemsInAPage = 2;
    this.currentPage = 1;
  }

  public contacts: Contact[];
  public contactsToPage: Contact[];
  public numberOfItemsInAPage: number;
  public currentPage: number ;
  public form: FormGroup;
  public SortCategory = [
    {value: 'name',   label: 'By Name Ascending'},
    {value: 'name r', label: 'By Name Descending'},
    {value: 'birthDate',   label: 'By Date Ascending'},
    {value: 'birthDate r', label: 'By Date Descending'}
    ];

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

  onPaginateTo(nextPage: number): void{
    this.currentPage = nextPage;
    this.contactsToPage = ArrayManipulations.selectItemsFromPage(this.contacts, this.numberOfItemsInAPage, nextPage);
  }

  ngOnInit(): void {
    this.service.getContacts()
      .subscribe(
        response => {
          this.contacts = Object.keys(response).map(key => {
            const item = response[key];
            item.birthDate = new Date((response[key].birthDate).substring(0, 10));
            return (item as Contact);
          });
          this.contactsToPage = ArrayManipulations.selectItemsFromPage(this.contacts, this.numberOfItemsInAPage, this.currentPage);
      });
    this.form = new FormGroup({sortOrder: new FormControl()});
    this.form.controls['sortOrder'].valueChanges.subscribe(val => {
      this.contacts = ArrayManipulations.sortItemsBy(this.contacts, val);
      this.contactsToPage = ArrayManipulations.selectItemsFromPage(this.contacts, this.numberOfItemsInAPage, this.currentPage);
    });
  }
}
