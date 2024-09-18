import { Component, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
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
import { UserdataService } from './userdata.service';

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
export class AppComponent implements OnInit, OnChanges {
  title = 'angular-fif';
  labelButton!: string;
  userData!: Array<DataUser>;
  name: string = '';
  addUserForm!: FormGroup;

  constructor(private userService: UserdataService) {
    this.userData = userService.getUsers();
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('asu')
    console.log(changes)
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
    this.userService.addNewUser(event)
  } 
}
