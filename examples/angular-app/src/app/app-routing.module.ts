import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VulnComponent } from './vuln/vuln.component';
import { Stored1Component } from './stored1/stored1.component';
import { Stored2Component } from './stored2/stored2.component';
import { Stored3Component } from './stored3/stored3.component';

const routes: Routes = [
  { path: 'vuln', component: VulnComponent, pathMatch: 'full' },
  { path: 'vuln/:payload', component: VulnComponent },
  { path: 'stored1', component: Stored1Component },
  { path: 'stored2', component: Stored2Component },
  { path: 'stored3', component: Stored3Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
