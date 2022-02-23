import { Component, OnInit, Injectable } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserInterface } from '../../interfaces/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './../popup/popup.component';

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
  public displayedColumns = ['Фамилия', 'Имя', 'Отчество', 'Количество автомобилей'];
  public selected: UserInterface | null = null;

  constructor(private userService: UserService,
              public dialog: MatDialog) { }

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
    this.userService.deleteUser(this.selected!);
    this.owners = this.owners.filter(el => el.id != this.selected?.id);
    console.log(this.owners)
  }

  create() {

  }

  openModal() {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '80%',

    });

    dialogRef.afterClosed().subscribe(user => {
      if (user) {
        this.owners.push(user)
      }
    })
  }
}
