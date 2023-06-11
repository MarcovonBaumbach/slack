import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  user: any;
  answerContainer: boolean = false;
  selectedChannel;
  param;
  index;
  constructor() {
  }
}
