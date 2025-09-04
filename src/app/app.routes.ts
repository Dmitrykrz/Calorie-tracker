import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HelpComponent } from './help.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', redirectTo: '' }
];