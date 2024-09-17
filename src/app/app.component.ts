import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataUser } from './app.model';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { GenerateRandomIdService } from './generate-random-id.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormComponent } from './form/form.component';
import { UserTableComponent } from './user-table/user-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    FormComponent,
    UserTableComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'angular-fif';
  labelButton!: string;
  userData!: Array<DataUser>;
  name: string = '';
  addUserForm!: FormGroup;

  constructor(private generateService: GenerateRandomIdService) {
    this.title = generateService.generateId();

    this.addUserForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      city: new FormControl('', [Validators.required]),


      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(14)
      ]),
    });

    this.userData = [
      {
        name: "Fariz",
        email: "fariz@mail.com",
        address: {
          city: "Tangerang",
          province: "Banten",
          zipcode: 10205
        }
      },
      {
        name: "Rizky",
        email: "Rizky@mail.com",
        address: {
          city: "Tangerang Selatan",
          province: "Banten",
          zipcode: 10310
        }
      }
    ]
  }

  ngOnInit(): void {
    console.log('barudak');
  }

  receiveFromChild(event: string): void {
    this.title = event;
    this.labelButton = event;
  }

  checkOnChange(): void {
    // console.log(this.addUserForm.get('name')?.errors);
  }

  onSubmit() {
    console.log('halo from form');
    console.log(this.addUserForm.get('phoneNumber')?.errors)
  }

  receiveUser(event: DataUser) {
    console.log(event);
    this.userData.push(event)
  } 
}
