import { Component } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  channelsVisible: boolean = true;
  usersVisible: boolean = true;
  channels: any = [
    'allgemein',
    'angular',
    'community',
    'html/css',
    'javascript',
    'live-calls',
    'projekt-feedback'
  ];
  channels$: Observable<any>;
  users: any;
  users$: Observable<any>;
  firstLetter: any = [];


  //Von Liu
  userRoute: any;
  urlID: string;

  //Ende Liu

  constructor(
    public firestore: Firestore,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public dataService: DataService
  ) {
    this.users = collection(this.firestore, 'users');
    this.users$ = collectionData(this.users);
    this.channels = collection(this.firestore, 'channels');
    this.channels$ = collectionData(this.channels);
    this.generateFirstLetter();
  }

  ngOnInit() {
    this.userRoute = this.route.params.subscribe((params) => {
      this.urlID = params['id'];
    })
  }

  generateFirstLetter() {
    this.users$.forEach((user) => {
      for (let i = 0; i < user.length; i++) {
        this.firstLetter.push(user[i].firstName.split('')[0]);
      }
    })
  }

  showChannels(param: boolean) {
    this.channelsVisible = param;
  }

  showUsers(param: boolean) {
    this.usersVisible = param;
  }

  // openMenuItem(param, index) {
  //   this.highlightMenuItem(param, index);
  //   this.dataService.selectedChannel = param;
  // }

  openAddChannelDialog() {
    this.dialog.open(DialogAddChannelComponent, {
    });
  }

  highlightMenuItem(param, index) {
    this.dataService.answerContainer = false;
    this.channels$.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        if (document.getElementById(`channel${i}`).classList.contains('background-focused')) {
          document.getElementById(`channel${i}`).classList.remove('background-focused');
        }
      }
    });
    this.users$.forEach((user) => {
      for (let i = 0; i < user.length; i++) {
        if (document.getElementById(`user${i}`).classList.contains('background-focused')) {
          document.getElementById(`user${i}`).classList.remove('background-focused');
        }
      }
      document.getElementById(param + index).classList.add('background-focused');
    });
  }
}
