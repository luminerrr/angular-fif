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
import { UserdataService } from '../../../service/userdata.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnackbarService } from '../../../service/snackbar.service';
import { DataUser } from '../../models/app.model';
import { HttpService } from '../../../service/http-service/http.service';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent implements OnInit {
  @Output() deleteId: EventEmitter<string> = new EventEmitter<string>();
  users: Array<any> = [];
  isChecked: Boolean = false;
  todayDate: Date = new Date();
  isDue!: number;
  isLoading: boolean = false;
  search = new FormControl<string | null>('');
  isLoadingSearch: boolean = false;

  constructor(
    private userService: UserdataService,
    private snackbar: SnackbarService,
    private http: HttpService,
    public router: Router
  ) {
    this.getUsersData();
  }

  ngOnInit(): void {
    this.search.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      this.getUsersData(value);
    });
  }

  deleteUser(index?: string): void {
    this.isLoading = true;
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

  onChangeCheckbox(userId: string, event: any) {
    this.isLoading = true;
    const isCheck = event.target.checked;
    const selectedUser = this.users.find((user) => user.id === userId);
    const payload = {
      ...selectedUser,
      ischecked: isCheck,
    };
    this.http.editData('/rakamin/employee', userId, payload).subscribe({
      next: (res) => {
        this.snackbar.openSnackBar('Success che ck user', '');
      },
      error: (error) => {
        this.snackbar.openSnackBar('Fail to check user', '');
      },
      complete: () => {
        this.isLoading = false;
      },
    });
    // this.userService.checkUser(index, event.target.checked);
  }

  dateDifference(date: Date): number {
    const res = this.todayDate.getDate() - date.getDate();
    return res;
  }

  dateDifferenceAbs(date: Date): number {
    const res = Math.abs(this.todayDate.getDate() - date.getDate());
    return res;
  }

  getUsersData(search: string | null = '') {
    this.http.getData('/rakamin/employee', search).subscribe({
      next: (response: any) => {
        this.users = response;
      },
      error: (error) => {
        if (error.status === 404) {
          this.users = [];
        }
      },
      complete: () => {
        this.isLoadingSearch = false;
      },
    });
  }

  onChangeLoading() {
    this.isLoadingSearch = true;
  }
}
