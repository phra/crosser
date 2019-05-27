import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stored1',
  templateUrl: './stored1.component.html',
  styleUrls: ['./stored1.component.css']
})
export class Stored1Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  savePayload() {
    const payload = (document.querySelector('#vuln') as any).value;
    localStorage.setItem('payload', payload);
  }

}
