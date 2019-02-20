import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { ContactComponent } from './contact/contact.component';
import { LocationComponent } from './location/location.component';
import { AboutComponent } from './about/about.component';


/**
 * Module to describes routes and check authorizated guards.
 */
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'project/:elementId', component: ProjectComponent },
  { path: 'location', component: LocationComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

/**
 * Module to describes routes and check authorizated guards.
 */
export const Routing = RouterModule.forRoot(appRoutes);
