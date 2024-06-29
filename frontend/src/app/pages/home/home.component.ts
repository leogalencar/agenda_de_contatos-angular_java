import { Component, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { IContact } from '../../interfaces/contact';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnChanges {
  formTitle: string = '';
  formAction!: 'save' | 'edit';
  formSelectedContact: IContact | null = null;
  isFormModalOpen: boolean = false;
  clickListener: (() => void) | undefined;

  contacts: IContact[] = [];

  constructor(
    private contactService: ContactService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.getContacts();
  }

  ngOnChanges(): void {
    this.updateContent();
  }

  handleNewContact() {
    this.formTitle = 'Novo contato';
    this.formAction = 'save';

    this.isFormModalOpen = true;
    this.updateContent();

    setTimeout(() => {
      this.addOutsideModalClickListener();
    }, 0);
  }

  handleEditContact(contact: IContact) {
    this.formTitle = 'Editar contato';
    this.formAction = 'edit';
    this.formSelectedContact = contact;

    this.isFormModalOpen = true;
    this.updateContent();
  }

  handleFormSubmit(contact: IContact) {
    console.log(contact);

    if (contact) {
      if (this.formAction === 'save') {
        this.saveContact(contact);
      } else {
        this.updateContact(contact);
      }
    }

    this.isFormModalOpen = false;
    this.updateContent();
  }

  getContacts() {
    this.contactService.getContacts().subscribe({
      next: (data) => (this.contacts = data),
    });
  }

  saveContact(contact: IContact) {
    this.contactService.saveContact(contact).subscribe({
      next: () => this.getContacts(),
    });
  }

  deleteContact(contact: IContact) {
    this.contactService.deleteContact(contact).subscribe({
      next: () => this.getContacts(),
    });
  }

  updateContact(contact: IContact) {
    this.contactService.updateContact(contact).subscribe({
      next: () => this.getContacts(),
    });
  }

  updateContent() {
    let backgroundShadow = document.getElementById('backgroundShadow');

    if (!backgroundShadow) {
      backgroundShadow = this.renderer.createElement('div');
      backgroundShadow!.id = 'backgroundShadow';
      backgroundShadow!.className =
        'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40';
    }

    const contactFormModal = document.getElementById('contactFormModal');

    if (this.isFormModalOpen) {
      this.renderer.addClass(document.body, 'overflow-hidden');
      this.renderer.appendChild(document.body, backgroundShadow);
      this.renderer.removeClass(contactFormModal, 'hidden');
      this.renderer.addClass(contactFormModal, 'flex');
    } else {
      this.renderer.removeClass(document.body, 'overflow-hidden');
      this.renderer.removeChild(document.body, backgroundShadow);
      this.renderer.addClass(contactFormModal, 'hidden');
      this.renderer.removeClass(contactFormModal, 'flex');

      if (this.clickListener) {
        this.clickListener();
      }
    }
  }

  addOutsideModalClickListener() {
    this.clickListener = this.renderer.listen(
      'document',
      'click',
      (event: MouseEvent) => {
        const contactFormModal = document.getElementById('contactFormModal');
        const isClickInside = contactFormModal?.children[0].contains(
          event.target as Node
        );
        console.log(isClickInside);
        if (!isClickInside && this.isFormModalOpen === true) {
          this.isFormModalOpen = false;
          this.updateContent();
        }
      }
    );
  }
}
