import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  url = 'http://localhost:3000/contacts'

  constructor(private http: HttpClient) { }

  getContacts(): Observable<IContact[]> {
    return this.http.get<IContact[]>(this.url);
  }
}
