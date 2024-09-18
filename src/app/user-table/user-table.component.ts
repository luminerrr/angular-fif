import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataUser } from '../app.model';
import { CommonModule } from '@angular/common';
import { UserdataService } from '../userdata.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent implements OnInit {
  @Input() users: Array<DataUser> = [];
  isChecked: Boolean = false;
  todayDate: Date = new Date();
  isDue!: number;

  constructor (private userService: UserdataService) {}

  ngOnInit(): void {
      console.log('asu')
  }


  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes)
      console.log('asu')
  }

  deleteUser(index: number): void {
    this.userService.deleteUser(index)
  }

  onChangeCheckbox(index: number, event: any) {
    this.userService.checkUser(index, event.target.checked);
  }
}
