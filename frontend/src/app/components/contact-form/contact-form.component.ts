import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IContact } from '../../interfaces/contact';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent implements OnInit, OnChanges {
  @Input() title!: string;
  @Input() action!: 'save' | 'edit';
  @Input() contact!: IContact | null;
  @Input() refreshEvent!: Subject<void>;
  @Output() formSubmitted = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {
    this.formGroupContact = formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      cellphone: ['', [Validators.required]],
      city: [''],
      gender: ['Selecione o seu sexo', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
      birthday: [''],
      isFavorite: [false],
      category: ['Pessoal', [Validators.required]],
    });
  }

  formGroupContact: FormGroup;

  ngOnInit(): void {
      this.refreshEvent.subscribe(() => {
        this.formGroupContact.reset();
        this.formGroupContact.controls['gender'].setValue(
          'Selecione o seu sexo',
          { onlySelf: true }
        );
        this.formGroupContact.controls['category'].setValue(
          'Pessoal',
          { onlySelf: true }
        );
      })
  }

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
        this.formGroupContact.controls['category'].setValue(
          'Pessoal',
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

    if (this.formGroupContact.valid) {
      this.formSubmitted.emit(this.formGroupContact.value);
    }
    else {
      this.formSubmitted.emit(null);
    }
  }

  cancel() {
    this.formSubmitted.emit(null);
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

  // Getters
  get id(): any {
    return this.formGroupContact.get('id');
  }

  get name(): any {
    return this.formGroupContact.get('name');
  }

  get email(): any {
    return this.formGroupContact.get('email');
  }

  get phone(): any {
    return this.formGroupContact.get('phone');
  }

  get cellphone(): any {
    return this.formGroupContact.get('cellphone');
  }

  get city(): any {
    return this.formGroupContact.get('city');
  }

  get gender(): any {
    return this.formGroupContact.get('gender');
  }

  get birthday(): any {
    return this.formGroupContact.get('birthday');
  }

  get isFavorite(): any {
    return this.formGroupContact.get('isFavorite');
  }

  get category(): any {
    return this.formGroupContact.get('category');
  }
}
