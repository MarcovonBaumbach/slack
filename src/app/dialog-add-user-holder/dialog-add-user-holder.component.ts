import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { updatePassword } from '@angular/fire/auth';

@Component({
  selector: 'app-dialog-add-user-holder',
  templateUrl: './dialog-add-user-holder.component.html',
  styleUrls: ['./dialog-add-user-holder.component.scss']
})
export class DialogAddUserHolderComponent{
  user = new User();
  registerForm: any;
  registrationTime: Date;
  emailInvalid: boolean = false;
  phoneInvalid: boolean = false;

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<DialogAddUserHolderComponent>,
  ) { }

  ngOnInit() {
      this.registerForm = new FormGroup({
      userFirstName: new FormControl('', [Validators.required]),
      userLastName: new FormControl('', [Validators.required]),
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      userPassword: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    let firstName = (document.getElementById('firstName') as HTMLInputElement).value;
    let lastName = (document.getElementById('lastName') as HTMLInputElement).value;
    let email = (document.getElementById('email') as HTMLInputElement).value;
    let password = (document.getElementById('password') as HTMLInputElement).value;
    let telephone = (document.getElementById('telephone') as HTMLInputElement).value;
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let numberformat = /^[0-9]+$/;

    if(firstName != '' && lastName != '' && password != '' && email.match(mailformat)
    && (telephone.match(numberformat) || telephone == '')) {

      this.getFormData(firstName, lastName, email, password, telephone);   
      this.addUserToFirestore();  
      this.dialogRef.close();
    }

    this.checkPhoneNumber(telephone, numberformat);
    this.checkEmail(email, mailformat);  
  }

  getFormData(firstName, lastName, email, password, telephone) {
    this.registrationTime = new Date();
    this.user.ID = this.registrationTime.getTime();
    this.user.firstName = firstName;
    this.user.lastName = lastName;
    this.user.email = email;
    this.user.password = password;
    this.user.telephone = +telephone;
  }

  addUserToFirestore() {
    this.firestore
    .collection('users')
    .add(this.user.toJSON())
    .then((result: any) => {
    });
  }

  checkPhoneNumber(telephone, numberformat) {
    if(!telephone.match(numberformat) && telephone != '') {
      this.phoneInvalid = true;
    } else this.phoneInvalid = false;
  }

  checkEmail(email, mailformat) {
    if(!email.match(mailformat)) {
      this.emailInvalid = true;
    } else this.emailInvalid = false;
  }
}
