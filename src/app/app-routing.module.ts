import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneratedListComponent } from './components/generated-list/generated-list.component';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: LandingComponent },
  { path: 'list', component: GeneratedListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
