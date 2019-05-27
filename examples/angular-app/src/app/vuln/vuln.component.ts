import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-vuln',
  templateUrl: './vuln.component.html',
  styleUrls: ['./vuln.component.css']
})
export class VulnComponent implements OnInit, OnDestroy {

  payload: SafeHtml;
  private sub: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.payload = this.sanitizer.bypassSecurityTrustHtml(params.payload || '<b>NOPAYLOAD</b>');
   });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  go() {
    const p = (document.querySelector('#payload') as any).value;
    this.router.navigate(['/vuln', p]);
  }

}
