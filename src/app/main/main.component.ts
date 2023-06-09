import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user.class';
import { Observable } from 'rxjs';
import { DialogAddStatusComponent } from '../dialog-add-status/dialog-add-status.component';
import { Firestore, collection, collectionData, doc, DocumentSnapshot, getDoc, docData } from '@angular/fire/firestore';
import { get } from '@angular/fire/database';
import { DataService } from '../data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  user = this.dataservice.user;
  users$: Observable<any>;
  urlID: string;
  userRoute: any;
  userStatus: string;
  logInTime: Date = new Date;
  public userHolder: any;
  color: string;
  docSnap: DocumentSnapshot;
  searchValue: string;

  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialogAddStatus: MatDialog,
    private dataservice: DataService,
    private router: Router) {
    this.users$ = collectionData(collection(this.firestore, 'users'));
  }


  ngOnInit() {
    this.userRoute = this.route.params.subscribe(async (params) => {
      this.urlID = params['id'];
      this.docSnap = await getDoc(doc(this.firestore, 'users', this.urlID));
      this.user = this.docSnap.data();
      this.dataservice.user = this.user;
      localStorage.setItem('userID', this.urlID);
    });
  }

  ngOnDestroy() {
    this.userRoute.unsubscribe();
    this.dataservice.user = {};
    window.location.reload();
  }

  onOutletLoaded(ChannelsComponent) {
    ChannelsComponent.currentUser = this.user;
  }

  search() {
    let userFound = false;
    let searchedUser = this.searchValue.split(" ");
    this.users$.forEach((users) => {
      for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < searchedUser.length; j++) {
          if (users[i].firstName.toLowerCase().includes(searchedUser[j].toLowerCase()) || 
              users[i].lastName.toLowerCase().includes(searchedUser[j].toLowerCase())) {
            this.router.navigateByUrl(`/main/${this.urlID}/(body:profil/${users[i].ID})`);
            userFound = true;
          }
        }
      }
      if (userFound == false) {
        window.alert('Es wurde kein Kontakt zu Ihrer Eingabe gefunden.');
      }
    });
  }

  // getUserStatus() {
  //   let statusObj;
  //   if (this.user.status == '') {
  //     statusObj = { status: 'Active' }
  //     this.firestore
  //       .collection('users')
  //       .doc(this.urlID)
  //       .update(statusObj)
  //       .then(() => {
  //         console.log(this.user);

  //       })
  //   }
  // }


  openDialogAddStatus() {
    this.dialogAddStatus.open(DialogAddStatusComponent);
  }
}
