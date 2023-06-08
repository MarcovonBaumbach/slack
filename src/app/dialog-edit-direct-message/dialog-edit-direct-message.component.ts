import { Component, Inject } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-direct-message',
  templateUrl: './dialog-edit-direct-message.component.html',
  styleUrls: ['./dialog-edit-direct-message.component.scss']
})
export class DialogEditDirectMessageComponent {
  editedMessage: string = this.data.singleMessage.text;
  singleMessage = this.data.singleMessage;
  i = this.data.i;
  currentUserMessages = this.data.currentUserMessages;
  userID: string = this.data.userID;
  userToChatID: string = this.data.userToChatID;

  constructor(public dialogRef: MatDialogRef<DialogEditDirectMessageComponent>,
    private firestore: Firestore,
    @Inject(MAT_DIALOG_DATA) public data: {singleMessage, i, currentUserMessages, userID, userToChatID}) {
    }

  async saveEdit() {
    this.singleMessage.text = this.editedMessage;
    this.currentUserMessages[this.i] = this.singleMessage;

    this.updateDatabase()
    
    this.dialogRef.close();
  }

  async updateDatabase() {
    await updateDoc(doc(this.firestore, 'users', this.userID), {
      [`messages${this.userToChatID}`]: this.currentUserMessages
    });
    if (this.userToChatID != this.userID) {
      await updateDoc(doc(this.firestore, 'users', this.userToChatID), {
        [`messages${this.userID}`]: this.currentUserMessages
      });
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
