import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dialog-add-status',
  templateUrl: './dialog-add-status.component.html',
  styleUrls: ['./dialog-add-status.component.scss']
})
export class DialogAddStatusComponent {
  status: string;
  urlID: any;
  userRoute: any;


  constructor(private firestore: AngularFirestore,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<DialogAddStatusComponent>,
  ) {

  }
  ngOnInit() {
    this.userRoute = location.href
    console.log(this.userRoute);
    
    // this.route.params.subscribe((params) => {
    //   debugger

    //   this.urlID = params['id'];
    // })
  }

  selectStatus(value) {
    this.status = value;
    console.log(value);
    console.log(this.status);
  }


  addNewStatus(status) {
    let statusObj = { status: status }

    this.firestore
      .collection('users')
      .doc(this.urlID)
      .update(statusObj)
      .then(() => {
        this.dialogRef.close();
      })
  }
}

