import { Component, Inject, OnInit } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-profile',
  templateUrl: './dialog-edit-profile.component.html',
  styleUrls: ['./dialog-edit-profile.component.scss']
})
export class DialogEditProfileComponent implements OnInit {

  userForm;
  user;
  userID;
  emailInvalid: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogEditProfileComponent>,
    private firestore: Firestore,
    @Inject(MAT_DIALOG_DATA) public data: { user, urlID }) {
      this.user = this.data.user;
      this.userID = this.data.urlID;
    }

  ngOnInit() {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    });
  }

  async saveEdit() {
    let userTelephone = (document.getElementById('userTelephone') as HTMLInputElement).value;
    let userEmail = (document.getElementById('userEmail') as HTMLInputElement).value;
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (userEmail.match(mailformat)) {
      await updateDoc(doc(this.firestore, 'users', this.userID), {
        email: userEmail,
        telephone: userTelephone
      });
      this.dialogRef.close();
    } else this.emailInvalid = true;
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
