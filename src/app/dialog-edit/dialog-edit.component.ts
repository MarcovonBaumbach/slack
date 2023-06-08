import { Component, Inject } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.scss']
})
export class DialogEditComponent {
  editedMessage: string = this.data.singleMessage.text;
  singleMessage = this.data.singleMessage;
  i = this.data.i;
  channel = this.data.channel;
  channelID = this.data.channelID;

  constructor(public dialogRef: MatDialogRef<DialogEditComponent>,
    private firestore: Firestore,
    @Inject(MAT_DIALOG_DATA) public data: {singleMessage, i, channel, channelID}) {}

  async saveEdit() {
    this.singleMessage.text = this.editedMessage;
    this.channel.messages[this.i] = this.singleMessage;

    await updateDoc(doc(this.firestore, 'channels', this.channelID), {
      messages: this.channel.messages,
    });

    this.dialogRef.close();
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
