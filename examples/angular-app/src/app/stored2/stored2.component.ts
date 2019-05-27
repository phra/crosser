import { Component, OnInit } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-stored2',
  templateUrl: './stored2.component.html',
  styleUrls: ['./stored2.component.css']
})
export class Stored2Component implements OnInit {

  payload: SafeHtml;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  loadPayload() {
    this.payload = this.sanitizer.bypassSecurityTrustHtml(localStorage.getItem('payload') || '');
  }

}
