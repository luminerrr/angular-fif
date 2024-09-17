import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataUser } from '../app.model';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  addUserForm!: FormGroup;
  @Output() pushNewUser = new EventEmitter<DataUser>();

  constructor() {
    this.addUserForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      city: new FormControl('', [Validators.required]),
      province: new FormControl('', [Validators.required]),
      zipCode: new FormControl(0, [Validators.required]),
    });
  }

  onSubmit() {
    console.log('push to parent')
    this.pushNewUser.emit({
      name: this.addUserForm.get('name')?.value,
      email: this.addUserForm.get('email')?.value,
      address: {
        city: this.addUserForm.get('city')?.value,
        province: this.addUserForm.get('province')?.value,
        zipcode: this.addUserForm.get('zipCode')?.value
      }
    })
  }
}
