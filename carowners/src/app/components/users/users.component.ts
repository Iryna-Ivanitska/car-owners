import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserInterface } from '../../interfaces/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './../popup/popup.component';
import { MatTable } from '@angular/material/table';

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
    
    console.log(user)
    this.selected = user;
  }

  deletOwner() {
    this.owners = this.owners.filter(el => el.id != this.selected!.id);
    console.log(this.owners)
  }

  addOwner(user: UserInterface) {
    this.owners.push(user);
    this.table.renderRows();
  }


  openModal(action: string, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '80%',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        switch (result.action) {
          case 'add':
            this.addOwner(result.user)
            break;
          case 'update':
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
