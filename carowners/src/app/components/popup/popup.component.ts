import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { UserInterface } from './../../interfaces/user.interface';
import { CarInterface } from './../../interfaces/car.interface';
import { User } from './../../model/user.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  public formGroup: FormGroup | any;
  public owner: User = new User(null, '', '', '');

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UserService,
              public dialogRef: MatDialogRef<PopupComponent>) { }

  ngOnInit(): void {
    if (this.data.action != 'add') {
      this.owner = this.data;
    }
    this.formGroup = this.fb.group({
      surname: [this.owner?.surname, [Validators.required]],
      name: [this.owner?.name, [Validators.required]],
      father: [this.owner?.father, [Validators.required]]
    });
    if (this.data.action === 'view') {
      this.formGroup.disable()
    }
  }

  create() {
    if (this.formGroup.invalid) return;
    if (this.data.cars.length === 0) {
      alert('Добавте минимум один автомобиль');
      return;
    };
    let user = {
      surname: this.formGroup.value.surname,
      name: this.formGroup.value.name,
      father: this.formGroup.value.father,
      cars: this.data.cars
    }
    this.userService.addUser(user as User).subscribe( res => {
      let obj = {
        user: res,
        action: this.data.action
      }
      this.dialogRef.close(obj)}
      );
  }

  update() {
    if (this.formGroup.invalid) return;
    if (this.data.cars.length === 0) {
      alert('Добавте минимум один автомобиль');
      return;
    };
    let user: UserInterface = {
      id:  this.owner.id,
      surname: this.formGroup.value.surname,
      name: this.formGroup.value.name,
      father: this.formGroup.value.father,
      cars: this.data.cars
    }
    this.userService.updateUser(user).subscribe( _ => {
      let obj = {
        user: user,
        action: this.data.action
      }
      this.dialogRef.close(obj)
    }
      );
  }
}
