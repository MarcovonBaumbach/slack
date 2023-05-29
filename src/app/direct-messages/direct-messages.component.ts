import { Component, OnInit } from '@angular/core';
import { DocumentSnapshot, Firestore, collection, collectionData, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-direct-messages',
  templateUrl: './direct-messages.component.html',
  styleUrls: ['./direct-messages.component.scss']
})
export class DirectMessagesComponent implements OnInit {
  urlID: string;
  userRoute: any;
  currentUser: any = this.dataservice.user;
  currentUserMessages: any;
  userToChat: any;
  users$: Observable<any>;
  userID: string;
  userToChatID: string;
  docSnap: DocumentSnapshot;
  docSnapUser: DocumentSnapshot;
  message: string;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dataservice: DataService,
    private router: Router
  ) {
    this.users$ = collectionData(collection(this.firestore, 'users'), { idField: 'id' });
  }


  ngOnInit() {
    this.userRoute = this.route.params.subscribe((params) => {
      this.urlID = params['id'];
      this.users$.forEach(async (users) => {
        for (let i = 0; i < users.length; i++) {
          if (users[i].ID == this.urlID) {
            this.userToChatID = users[i]['id'];
            this.docSnap = await getDoc(doc(this.firestore, 'users', users[i]['id']));
            this.userToChat = this.docSnap.data();
            this.getCurrentUser();
          }
        }
      });
    })
  }

  async getCurrentUser() {
    this.userID = localStorage.getItem('userID');
    if (this.userID) {
      this.docSnapUser = await getDoc(doc(this.firestore, 'users', this.userID));
      this.currentUser = this.docSnapUser.data();
      this.currentUserMessages = this.currentUser[`messages${this.userToChatID}`];
    }
  }

  saveMessage() {
    if (this.message) {
      let newMessages = []
      if (this.currentUserMessages) {
        newMessages = this.currentUserMessages;
      }
      this.pushMessageInArray(newMessages);
      this.updateDatabase(newMessages);      
      this.message = '';
      setTimeout(() => {
        this.router.navigateByUrl(`/main/${this.userID}/(body:direct_messages/${this.urlID})`);
      }, 1000);
    } else window.alert('Bitte fülle das Textfeld aus');   
  }

  async updateDatabase(newMessages) {
    await updateDoc(doc(this.firestore, 'users', this.userID), {
      [`messages${this.userToChatID}`]: newMessages
    });
    if (this.userToChatID != this.userID) {
      await updateDoc(doc(this.firestore, 'users', this.userToChatID), {
        [`messages${this.userID}`]: newMessages
      });
    }
  }

  pushMessageInArray(newMessages) {
    let date = new Date();
      newMessages.push({
        text: this.message,
        time: date.toLocaleString(),
        firstName: this.currentUser.firstName,
        lastName: this.currentUser.lastName
      });
  }
}
