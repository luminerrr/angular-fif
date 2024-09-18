import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserdataService } from '../shared/userdata.service';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from '../shared/snackbar.service';
import { DataUser } from '../models/app.model';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent implements OnInit {
  @Input() users: Array<DataUser> = [];
  isChecked: Boolean = false;
  todayDate: Date = new Date();
  isDue!: number;

  constructor(
    private userService: UserdataService,
    private snackBar: SnackbarService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  deleteUser(index: number): void {
    try {
      this.userService.deleteUser(index);
      this.snackBar.openSnackBar('Success delete user', '');
    } catch (error) {
      this.snackBar.openSnackBar('Error deleting user', '');
    }
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
}
('');
