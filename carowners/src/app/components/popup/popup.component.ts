import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { UserInterface } from './../../interfaces/user.interface';
import { UsersComponent } from './../users/users.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  public formGroup: FormGroup | any;
  public owner: UserInterface | null = null;
  private users: UserInterface[] = [];


  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: UserInterface,
              private userService: UserService,
              public dialogRef: MatDialogRef<PopupComponent>) { }

  ngOnInit(): void {
    if (this.data) {
      this.owner = this.data;
    }

    this.formGroup = this.fb.group({
      surname: [this.owner?.surname, [Validators.required]],
      name: [this.owner?.name, [Validators.required]],
      father: [this.owner?.father, [Validators.required]]
    });
    this.userService.getUsers().subscribe(users => this.users = users)
  }

  create() {
    if (this.formGroup.invalid) return;

    let user = {
      id: this.users.length > 0 ? Math.max(...this.users.map(user => user.id)) + 1 : 11,
      surname: this.formGroup.value.surname,
      name: this.formGroup.value.name,
      father: this.formGroup.value.father,
      cars: []
    }
    this.userService.addUser(user).subscribe( user => this.dialogRef.close(user)
      );
  }

}
