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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'angular-fif';
  labelButton!: string;
  dataUser: DataUser = {
    name: 'John Doe',
    age: 30,
    address: [
      {
        city: 'jakarta',
        district: '9',
        province: 'apaajah',
        zipcode: 1,
      },
    ],
  };
  name: string = '';
  addUserForm!: FormGroup;

  constructor(private generateService: GenerateRandomIdService) {
    this.title = generateService.generateId();

    this.addUserForm = new FormGroup({
      name: new FormControl('', [Validators.email, Validators.required]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(14)
      ]),
    });
  }

  ngOnInit(): void {
    console.log(this.dataUser);
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
}
