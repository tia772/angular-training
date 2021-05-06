import { Component, OnInit } from '@angular/core';
import * as fromUsers from '../store/intex';
import { Store, select } from '@ngrx/store';
import { IUser } from '../interface/user';
 
@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css']
})
export class GetUserComponent implements OnInit {
  users: IUser[] = [];
  public isLoading: boolean;
  constructor(
    private store: Store<fromUsers.IUserState>) { }
  ngOnInit() {
    this.store.dispatch(new fromUsers.GetUserLoad());
    const users$ = this.store.pipe(select(fromUsers.allUsers));
    users$.subscribe(res => {
      this.isLoading = res.isLoading;
      this.users = res.data;
    });
  }
  public getFirstTenUsers(): void {
    const firstTenUsers$ = this.store.pipe(select(fromUsers.firstTenUsers));
    firstTenUsers$.subscribe(res => {
      this.isLoading = res.isLoading;
      this.users = res.data;
    });
  }
}