import { Component, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-status',
  templateUrl: './dialog-add-status.component.html',
  styleUrls: ['./dialog-add-status.component.scss']
})
export class DialogAddStatusComponent {
  urlID: string = this.data.urlID;
  userRoute: any;

  constructor(private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogAddStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {urlID: string}
  ) {}

  selectStatus(value) {
    let statusObj = { status: value }

    this.firestore
      .collection('users')
      .doc(this.urlID)
      .update(statusObj)
      .then(() => {
        this.dialogRef.close();
      })
  }
}

