import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  user;
  answerContainer: boolean = false;
  selectedChannel;
  constructor() {
   
  }
}
