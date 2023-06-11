import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { DialogEditProfileComponent } from '../dialog-edit-profile/dialog-edit-profile.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: User = new User;
  users: any;
  users$: Observable<any>;
  status: any;
  userRoute: any;
  urlID: any;


  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private angFirestore: AngularFirestore,
    private firestore: Firestore
    ) {
    this.users = collection(this.firestore, 'users');
    this.users$ = collectionData(this.users);
  }

  ngOnInit(): void {
    this.userRoute = this.route.parent.params.subscribe((params) => {
      this.urlID = params['id'];
      this
        .angFirestore
        .collection('users')
        // .users
        .doc(this.urlID)
        .valueChanges()
        .subscribe((user: any) => {
          this.user = user;
          // this.getStatus(user.status);
        });
    })
  }

  openEditProfileDialog() {
    this.dialog.open(DialogEditProfileComponent, { 
      data: {
        user: this.user,
        urlID: this.urlID
      }
    });
  }
}
