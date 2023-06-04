import { Component, OnInit, Input } from '@angular/core';
import { DocumentSnapshot, Firestore, collection, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search-user-profile',
  templateUrl: './search-user-profile.component.html',
  styleUrls: ['./search-user-profile.component.scss']
})
export class SearchUserProfileComponent implements OnInit{

  user: any = this.dataservice.user;
  userID: any;
  users: any;
  users$: Observable<any>;
  status: any;
  userRoute: any;
  docSnap: DocumentSnapshot;
  urlID: any;


  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dataservice: DataService
    ) {
    this.users = collection(this.firestore, 'users');
    this.users$ = collectionData(this.users, { idField: 'id' });
  }



  ngOnInit(): void {
    this.userRoute = this.route.params.subscribe((params) => {
      this.urlID = params['id'];
      this.users$.forEach(async (users) => {
        for (let i = 0; i < users.length; i++) {
          if (users[i].ID == this.urlID) {
            this.userID = users[i]['id'];
            this.docSnap = await getDoc(doc(this.firestore, 'users', users[i]['id']));
            this.user = this.docSnap.data();
          }
        }
      });
    })
  }

  // getStatus(status) {
  //   if(status){
  //     this.status = 'Active'
  //   }

  // }
}
