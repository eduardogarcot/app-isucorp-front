import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private url = 'https://localhost:5001/api/contacts';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getContacts() {
    return this.http.get(this.url);
  }
  // tslint:disable-next-line:typedef
  getContact(id: number ) {
    return this.http.get(this.url + '/' + id );
  }
  // tslint:disable-next-line:typedef
  postContact(contact) {
    return this.http.post(this.url, contact);
  }
  // tslint:disable-next-line:typedef
  updateContact(contact, id: number) {
    return this.http.put(this.url + '/' + id, contact);
  }
  // tslint:disable-next-line:typedef
  deleteContact(id: number)
  {
    return this.http.delete( this.url + '/' + id);
  }
}
