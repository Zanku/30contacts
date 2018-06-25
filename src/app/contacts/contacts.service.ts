import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contacts, Contact } from './models/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  baseUrl = 'http://5b2a862d3a8ea3001418d7bb.mockapi.io/contacts'
  constructor(private http: HttpClient) { }

  list(): Observable<Contacts>{
    return this.http.get<Contacts>(this.baseUrl);
  }

  get(id: number): Observable<Contact>{
    return this.http.get<Contact>(`${this.baseUrl}/${id}`);

  }

  save(contact: Contact): Observable<Contact>{
    return contact.id ? 
          this.update(contact) : 
          this.create(contact);
  }

  create(contact: Contact): Observable<Contact>{
    return this.http.post<Contact>(this.baseUrl, contact);
  }

  update(contact: Contact): Observable<Contact>{
    return this.http.put<Contact>(`${this.baseUrl}/${contact.id}`, contact);
  }
}
