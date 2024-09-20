import { Injectable } from '@angular/core';
import { DataUser } from '../app/models/app.model';
import { userData } from '../app/user.data';

@Injectable({
  providedIn: 'root',
})
export class UserdataService {
  users: Array<DataUser> = userData;
  constructor() {}

  getUsers(): Array<DataUser> {
    return this.users;
  }

  addNewUser(user: DataUser): void {
    this.users.push(user);
  }

  deleteUser(index: number): void {
    this.users.splice(index, 1);
  }

  checkUser(index: number, isChecked: boolean): void {
    let selected = this.users[index];
    selected.isChecked = isChecked;
    this.users[index] = selected;
  }
}
