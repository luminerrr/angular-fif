import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserdataService } from '../../shared/userdata.service';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from '../../shared/snackbar.service';
import { DataUser } from '../../models/app.model';
import { HttpService } from '../../shared/http-service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent  {
  @Output() deleteId: EventEmitter<string> = new EventEmitter<string>();
  users: Array<any> = [];
  isChecked: Boolean = false;
  todayDate: Date = new Date();
  isDue!: number;
  isLoading: boolean = false;

  constructor(
    private userService: UserdataService,
    private snackbar: SnackbarService,
    private http: HttpService,
    public router: Router

  ) {
    this.getUsersData();
  }

  deleteUser(index?: string): void {
    this.isLoading = true
    this.http.deleteData('/rakamin/employee', index).subscribe({
      next: (data) => {
        this.snackbar.openSnackBar('Success delete user', '');
        this.getUsersData();
      },
      error: (error) => {
        this.snackbar.openSnackBar('Error deleting user', '');
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onChangeCheckbox(index: number, event: any) {
    this.userService.checkUser(index, event.target.checked);
  }

  dateDifference(date: Date): number {
    const res = this.todayDate.getDate() - date.getDate();
    return res;
  }

  dateDifferenceAbs(date: Date): number {
    const res = Math.abs(this.todayDate.getDate() - date.getDate());
    return res;
  }

  getUsersData() {
    this.http.getData('/rakamin/employee').subscribe({
      next: (response: any) => {
        this.users = response;
      }
    })
  }
}
