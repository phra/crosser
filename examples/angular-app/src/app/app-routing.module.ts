import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VulnComponent } from './vuln/vuln.component';

const routes: Routes = [
  { path: 'vuln', component: VulnComponent, pathMatch: 'full' },
  { path: 'vuln/:payload', component: VulnComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
