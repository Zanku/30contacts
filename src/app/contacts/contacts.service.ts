import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contacts, Contact } from './models/Contact';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  baseUrl = `${environment.apiUrl}/contacts`;
  
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

  delete(contact: Contact): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${contact.id}`);
  }
}
