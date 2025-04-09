import { Routes } from '@angular/router';
import { TemplatesComponent } from './templates/templates.component';

export const routes: Routes = [
  //   { path: '', component: HomeComponent }, // Default route
  { path: 'templates', component: TemplatesComponent },
  //   { path: '**', redirectTo: '', pathMatch: 'full' }, // Wildcard route for handling invalid paths
];
