import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserInterface } from '../../interfaces/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './../popup/popup.component';
import { MatTable } from '@angular/material/table';
import { User } from './../../model/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class UsersComponent implements OnInit {
  public owners: UserInterface[] = [];
  public displayedColumns = ['position', 'surname', 'name', 'father', 'cars'];
  public selected: UserInterface | null = null;
  dataSource = this.owners;

  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;

  constructor(private userService: UserService,
              public dialog: MatDialog,
              ) { }

  ngOnInit(): void {
    this.getOwners();
  }

  getOwners() {
    this.userService.getUsers()
    .subscribe(
      users => this.owners = users
    )
  }

  selectUser(user: UserInterface) {
    this.selected = user;
  }

  deletOwner() {
    this.owners = this.owners.filter(el => el.id != this.selected!.id);
    this.userService.deleteUser(this.selected!)
    this.table.renderRows();
  }

  createOwner(user: UserInterface) {
    this.owners.push(user);
    this.table.renderRows();
    this.selected = null;
  }

  updateOwner() {
    this.getOwners();
    this.table.renderRows();
    this.selected = null;
  }


  openModal(action: string, obj: any) {
    if (action == 'add') {
      obj = new User(null, '', '', '');
    }
    obj.action = action;
    obj.owners = this.owners;
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '80%',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        switch (result.action) {
          case 'add':
            console.log(result.user)
            this.createOwner(result.user)
            break;
          case 'update':
            this.updateOwner();
            break;
          case 'view':
            break;
          default:
          console.log("Что-то не так...");
        }
      }
    });
  }
}
