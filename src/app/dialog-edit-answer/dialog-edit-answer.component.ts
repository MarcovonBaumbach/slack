import { Component, Inject } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-answer',
  templateUrl: './dialog-edit-answer.component.html',
  styleUrls: ['./dialog-edit-answer.component.scss']
})
export class DialogEditAnswerComponent {
  editedAnswer: string = this.data.singleAnswer.text;
  singleAnswer = this.data.singleAnswer;
  messageIndex = this.data.messageIndex;
  i = this.data.i;
  channel = this.data.channel;
  channelID = this.data.channelID;

  constructor(public dialogRef: MatDialogRef<DialogEditAnswerComponent>,
    private firestore: Firestore,
    @Inject(MAT_DIALOG_DATA) public data: {singleAnswer, i, messageIndex, channel, channelID}) {}

  async saveEdit() {
    this.singleAnswer.text = this.editedAnswer;
    this.channel.messages[this.messageIndex].answers[this.i] = this.singleAnswer;

    await updateDoc(doc(this.firestore, 'channels', this.channelID), {
      messages: this.channel.messages,
    });

    this.dialogRef.close();
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
