import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IContact } from '../../interfaces/contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent implements OnChanges {
  @Input() title!: string;
  @Input() action!: 'save' | 'edit';
  @Input() contact!: IContact | null;
  @Output() formSubmitted = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {
    this.formGroupContact = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      phone: [''],
      cellphone: [''],
      city: [''],
      gender: ['Selecione o seu sexo'],
      birthday: [''],
      isFavorite: [false],
    });
  }

  formGroupContact: FormGroup;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['action'] || changes['contact']) {
      if (this.action === 'edit' && this.contact) {
        this.formGroupContact.setValue(this.contact);
      } else {
        this.formGroupContact.reset();
        this.formGroupContact.controls['gender'].setValue(
          'Selecione o seu sexo',
          { onlySelf: true }
        );
      }
    }
  }

  onSubmit() {
    if (!this.formGroupContact.value.isFavorite) {
      this.formGroupContact.patchValue({ isFavorite: false })
    }

    if (this.formGroupContact.value.phone) {
      const formattedPhone = this.formatPhone(
        this.formGroupContact.value.phone
      );

      this.formGroupContact.patchValue({
        phone: formattedPhone,
      });
    }

    if (this.formGroupContact.value.cellphone) {
      const formattedCellphone = this.formatCellphone(
        this.formGroupContact.value.cellphone
      );

      this.formGroupContact.patchValue({
        cellphone: formattedCellphone,
      });
    }

    this.formSubmitted.emit(this.formGroupContact.value);
  }

  formatPhone(phone: string): string {
    const phonePattern = /^(\d{2})(\d{4})(\d{4})$/;
    const phoneFormat = '(1) 2-3';
    return this.formatNumber(phone, phonePattern, phoneFormat);
  }

  formatCellphone(cellphone: string): string {
    const cellphonePattern = /^(\d{2})(\d{5})(\d{4})$/;
    const cellphoneFormat = '(1) 2-3';
    return this.formatNumber(cellphone, cellphonePattern, cellphoneFormat);
  }

  formatNumber(number: string, pattern: RegExp, format: string): string {
    const numbers = number.replace(/\D/g, '');
    const match = numbers.match(pattern);
    if (match) {
      return format.replace(/\d/g, (c) => match[parseInt(c)]);
    }
    return number;
  }
}
