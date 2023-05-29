import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserHolderComponent } from '../dialog-add-user-holder/dialog-add-user-holder.component';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DocumentSnapshot, Firestore, collection, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { user } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';


@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss']
})

export class InitialPageComponent implements OnInit {
  //docID = 'P9JqkUnlL2iGANgAKXMm';
  docSnap: DocumentSnapshot;
  loginForm: any;
  formBuilder: any = new FormBuilder();
  users$: Observable<any>;

  constructor(public dialogAddUser: MatDialog, private router: Router, private firestore: Firestore, private dataservice: DataService) {
    this.users$ = collectionData(collection(this.firestore, 'users'), { idField: 'id'});
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  bypassLogIn() {
    this.onSignup('guest@user.de', '123456');
  }

  loginAsUser() {

  }

  onSignup(emailSignup, passwordSignup) {
    let loginSuccessful = false;
    this.users$.forEach(async (user) => {
      for (let i = 0; i < user.length; i++) {
        if (user[i].email == emailSignup && user[i].password == passwordSignup) {
          this.docSnap = await getDoc(doc(this.firestore, 'users', user[i]['id']));
          this.dataservice.user = this.docSnap.data();
          loginSuccessful = true;
          this.router.navigateByUrl('/main/' + user[i]['id']);
        }
      }
      if (!loginSuccessful) {
        window.alert('Benutzer nicht vorhanden');
      }
    });
  }

  openDialogAddUser() {
    this.dialogAddUser.open(DialogAddUserHolderComponent)
  }
}
