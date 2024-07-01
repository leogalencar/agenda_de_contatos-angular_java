import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  url = 'http://localhost:8080/contacts'

  constructor(private http: HttpClient) { }

  getContacts(): Observable<IContact[]> {
    return this.http.get<IContact[]>(this.url);
  }

  getContactById(contactId: number): Observable<IContact> {
    return this.http.get<IContact>(`${this.url}/${contactId}`)
  }

  saveContact(contact: IContact): Observable<IContact> {
    return this.http.post<IContact>(this.url, contact);
  }

  deleteContact(contact: IContact): Observable<void> {
    return this.http.delete<void>(`${this.url}/${contact.id}`);
  }

  updateContact(contact: IContact): Observable<IContact> {
    return this.http.put<IContact>(`${this.url}/${contact.id}`, contact);
  }
}
