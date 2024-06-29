import { Component } from '@angular/core';
import { IContact } from '../../interfaces/contact';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  formTitle: string = ''
  formAction!: 'save' | 'edit';
  formSelectedContact: IContact | null = null;

  contacts: IContact[] = [
    {
      id: 1,
      name: 'Neil Sims',
      email: 'neil.sims@gmail.com',
      phone: '(11) 9999-9999',
      cellphone: '(11) 99999-9999',
      city: 'Itu',
      gender: 'Masculino',
      birthday: '2001-01-11',
      isFavorite: true,
    },
    {
      id: 1,
      name: 'Neil Sims 2',
      email: 'neil.sims@gmail.com',
      phone: '(11) 9999-9999',
      cellphone: '(11) 99999-9999',
      city: 'Itu',
      gender: 'Masculino',
      birthday: '2001-01-11',
      isFavorite: false,
    },
    {
      id: 1,
      name: 'Neil Sims 3',
      email: 'neil.sims@gmail.com',
      phone: '(11) 9999-9999',
      cellphone: '(11) 99999-9999',
      city: 'Itu',
      gender: 'Masculino',
      birthday: '2001-01-11',
      isFavorite: true,
    },
  ]

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

  saveContact(contact: IContact) {
    console.log(contact);
    console.log('save');
  }

  updateContact(contact: IContact) {
    console.log(contact);
    console.log('edit');
  }
}
