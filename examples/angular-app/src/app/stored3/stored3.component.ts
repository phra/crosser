import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stored3',
  templateUrl: './stored3.component.html',
  styleUrls: ['./stored3.component.css']
})
export class Stored3Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  loadPayload() {
    // tslint:disable-next-line:no-eval
    eval(localStorage.getItem('payload') || '');
  }

}
