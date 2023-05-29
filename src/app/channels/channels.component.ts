import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { DocumentSnapshot, Firestore, collection, collectionData, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  urlID: string;
  userRoute: any;
  currentUser: any;
  channels$: Observable<any>;
  users$: Observable<any>;
  channelID: string;
  userID: string;
  channel: any;
  docSnap: DocumentSnapshot;
  docSnapUser: DocumentSnapshot;
  message: string;
  answer: string;
  messageIndex: number;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dataservice: DataService
  ) {
    this.channels$ = collectionData(collection(this.firestore, 'channels'), { idField: 'id' });
    this.getCurrentUser();
  }


  ngOnInit() {
    this.userRoute = this.route.params.subscribe((params) => {
      this.urlID = params['id'];
      this.channels$.forEach(async (channels) => {
        for (let i = 0; i < channels.length; i++) {
          if (channels[i].ID == this.urlID) {
            this.channelID = channels[i]['id'];
            this.docSnap = await getDoc(doc(this.firestore, 'channels', channels[i]['id']));
            this.channel = this.docSnap.data();
            console.log('current channel:', this.channel);
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
    }
    console.log('user:', this.currentUser);
  }

  async saveMessage() {
    if (this.message) {
      let newMessages = this.channel.messages;
      let date = new Date();
      newMessages.push({
        answers: [],
        text: this.message,
        time: date.toLocaleString(),
        user: this.currentUser
      });
      await updateDoc(doc(this.firestore, 'channels', this.channelID), {
        messages: newMessages
      });
      this.message = '';
    } else window.alert('Bitte fülle das Textfeld aus');
  }

  async saveAnswer() {
    if (this.answer) {
      let newAnswers = this.channel.messages[this.messageIndex].answers;
      let date = new Date();
      newAnswers.push({
        text: this.answer,
        time: date.toLocaleString(),
        user: this.currentUser
      });

      await updateDoc(doc(this.firestore, `channels`, this.channelID), {
        messages: this.channel.messages
      });

      this.answer = '';
    } else window.alert('Bitte fülle das Textfeld aus');
  }

  openAnswerContainer(index: number) {
    this.messageIndex = index;
    this.dataservice.answerContainer = true;
  }
}
