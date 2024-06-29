import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { IContact } from '../../interfaces/contact';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css',
})
export class ContactDetailsComponent implements OnInit {
  contact!: IContact;

  constructor(private contactService: ContactService, private router: Router, private _location: Location) {}

  ngOnInit(): void {
    const url = this.router.url;
    const id: number = Number(url.split('/')[2]);

    this.getContactById(id);
  }

  getContactById(contactId: number) {
    this.contactService.getContactById(contactId).subscribe({
      next: (data) => {
        this.contact = data;
      },
      error: (error) => {
        console.error('Contato não existe no banco de dados.');
        this.router.navigate(['not-found']);
      },
    });
  }

  goBack() {
    this._location.back();
  }
}
