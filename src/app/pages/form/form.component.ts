import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataUser } from '../../models/app.model';
import { SnackbarService } from '../../shared/snackbar.service';
import { HttpService } from '../../shared/http-service/http.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  pathId!: string | null;
  isLoading: boolean = false;

  constructor(
    private snackbar: SnackbarService,
    private http: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // Minimum date time
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    this.minDate = `${year}-${month}-${day}`;

    // Form control
    this.addUserForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      paymentDeadline: new FormControl(this.minDate, [Validators.required]),
      city: new FormControl('', [Validators.required]),
      province: new FormControl('', [Validators.required]),
      zipCode: new FormControl(0, [Validators.required]),
      age: new FormControl(null, [Validators.required]),
      basicSalary: new FormControl(0, [Validators.required]),
    });

    // Get route
    this.pathId = activatedRoute.snapshot.paramMap.get('id');
    if (!!this.pathId) {
      this.isLoading = true
      http.getDataById('/rakamin/employee', this.pathId).subscribe({
        next: (response: any) => {
          this.addUserForm.get('name')?.setValue(response?.name);
          this.addUserForm.get('email')?.setValue(response?.email);
          this.addUserForm
          .get('paymentDeadline')
          ?.setValue(response?.paymentDeadline.split('T')[0]);  // get yyyy-mm-dd
          this.addUserForm.get('city')?.setValue(response?.city);
          this.addUserForm.get('province')?.setValue(response?.province);
          this.addUserForm.get('zipCode')?.setValue(response?.zipcode);
          this.addUserForm.get('age')?.setValue(response?.age);
          this.addUserForm.get('basicSalary')?.setValue(response?.basicSalary);
          
        },
        error: (error: any) => {
          console.error(error);
          router.navigate(['/not-found']);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  onSubmit() {
    this.isLoading = true;
    try {
      let formDate = this.addUserForm.get('paymentDeadline')?.value.split('-');
      const date = new Date(formDate[0], formDate[1] - 1, formDate[2]);
      const payload: DataUser = {
        name: this.addUserForm.get('name')?.value,
        email: this.addUserForm.get('email')?.value,
        paymentDeadline: date,
        city: this.addUserForm.get('city')?.value,
        province: this.addUserForm.get('province')?.value,
        zipcode: this.addUserForm.get('zipCode')?.value,
        isChecked: false,
        age: this.addUserForm.get('age')?.value,
        basicSalary: this.addUserForm.get('basicSalary')?.value,
      };
      if(this.pathId === null) {
        this.http.postData('/rakamin/employee', payload).subscribe({
          next: (res) => {
            this.snackbar.openSnackBar('Success adding new user', '');
            this.router.navigate(['']);
          },
          error: (err) => {
            this.snackbar.openSnackBar('Error adding new user', '');
            console.error(err);
          },
          complete: () => {
            this.isLoading = false;
          },
        });
      } else {
        this.http.editData('/rakamin/employee', this.pathId, payload).subscribe({
          next: (res) => {
            this.snackbar.openSnackBar('Success adding new user', '');
            this.router.navigate(['']);
          },
          error: (err) => {
            this.snackbar.openSnackBar('Error adding new user', '');
            console.error(err);
          },
          complete: () => {
            this.isLoading = false;
          }
        })
      }
    } catch (error) {
      this.snackbar.openSnackBar('Error adding new user', '');
      console.error(error);
    }
  }
}
