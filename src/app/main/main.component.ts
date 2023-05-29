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
  urlID: string;
  userRoute: any;
  userStatus: string;
  logInTime: Date = new Date;
  public userHolder: any;
  color: string;
  docSnap: DocumentSnapshot;




  searchlist: Array<any> = ['Liu', 'Marco', 'Danny'];
  searchValue: string;
  // panelOpenState = false;

  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialogAddStatus: MatDialog,
    private dataservice: DataService) { 
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

  clearSearch() {
    this.searchlist = []
  }

  search() {
    this.searchlist.unshift(this.searchValue);
    this.searchValue = '';
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
