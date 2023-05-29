import { Component } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss']
})
export class DialogAddChannelComponent {
  newChannel: string;
  channelExists: boolean = false;
  showErrorMessage: boolean = false;
  coll: any;
  channels$: Observable<any>;
  id: number;

  constructor(public firestore: Firestore, public dialogRef: MatDialogRef<DialogAddChannelComponent>) {
    this.coll = collection(this.firestore, 'channels');
    this.channels$ = collectionData(this.coll);
  }

  saveChannel() {
    let addedChannel = this.newChannel.toLowerCase();
    this.channels$.forEach((channel) => {
      this.checkIfChannelExists(channel, addedChannel);
      if (this.channelExists == false){
        this.generateID();
        addDoc(this.coll, {
          ID: this.id,
          messages: [],
          title: addedChannel
        });
        this.dialogRef.close();
      }
        this.channelExists = false;
    });
  }

  checkIfChannelExists(channel, addedChannel) {
    for (let i = 0; i < channel.length; i++) {
      if(addedChannel == channel[i].title){
        this.channelExists = true;
        this.showErrorMessage = true;
      }
    }
  }

  generateID() {
    let generatedID: number = Math.floor(Math.random() * Math.pow(10, 13));
    if(generatedID > Math.pow(10, 12)) {
      this.id = generatedID;
    }
    else this.generateID();
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
