import { Component, OnInit } from '@angular/core';
import { IContact } from '../../interfaces/contact';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  formTitle: string = ''
  formAction!: 'save' | 'edit';
  formSelectedContact: IContact | null = null;

  contacts: IContact[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getContacts();
  }

  handleNewContact() {
    this.formTitle = 'Novo contato';
    this.formAction = 'save';
  }

  handleEditContact(contact: IContact) {
    this.formTitle = 'Editar contato';
    this.formAction = 'edit';
    this.formSelectedContact = contact;
  }

  handleFormSubmit(contact: IContact) {
    if (this.formAction === 'save') {
      this.saveContact(contact);
    }
    else {
      this.updateContact(contact);
    }
  }

  getContacts() {
    this.contactService.getContacts().subscribe({
      next: data => this.contacts = data
    });
  }

  saveContact(contact: IContact) {
    console.log(contact);
    console.log('save');
  }

  updateContact(contact: IContact) {
    console.log(contact);
    console.log('edit');
  }
}
