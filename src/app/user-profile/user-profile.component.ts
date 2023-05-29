import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';

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
    console.log(this.user);
    this.userRoute = this.route.parent.params.subscribe((params) => {
      this.urlID = params['id'];
      this
        .angFirestore
        .collection('users')
        // .users
        .doc(this.urlID)
        .valueChanges()
        .subscribe((user: any) => {
          console.log(user);
          this.user = user;
          // this.getStatus(user.status);
        });
    })

  }


  // getStatus(status) {
  //   if(status){
  //     this.status = 'Active'
  //   }

  // }
}
