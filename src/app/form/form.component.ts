import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataUser } from '../models/app.model';
import { SnackbarService } from '../shared/snackbar.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  addUserForm!: FormGroup;
  minDate!: string;
  @Output() pushNewUser = new EventEmitter<DataUser>();

  constructor(private snackbar: SnackbarService) {
    this.addUserForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      paymentDeadline: new FormControl(new Date(), [Validators.required]),
      city: new FormControl('', [Validators.required]),
      province: new FormControl('', [Validators.required]),
      zipCode: new FormControl(0, [Validators.required]),
    });

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    this.minDate = `${year}-${month}-${day}`;
  }

  onSubmit() {
    try {
      let formDate = this.addUserForm.get('paymentDeadline')?.value.split('-');
      const date = new Date(formDate[0], formDate[1] - 1, formDate[2]);
      this.pushNewUser.emit({
        name: this.addUserForm.get('name')?.value,
        email: this.addUserForm.get('email')?.value,
        paymentDeadline: date,
        address: {
          city: this.addUserForm.get('city')?.value,
          province: this.addUserForm.get('province')?.value,
          zipcode: this.addUserForm.get('zipCode')?.value,
        },
        isChecked: false,
      });
      this.snackbar.openSnackBar('Success add new user', '');
    } catch (error) {
      this.snackbar.openSnackBar("Error adding new user", "")
    }
    
  }
}
