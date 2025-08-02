import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

export const routes = [
  { 
    path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  { 
    path: 'list', loadComponent: () => import('./reservation-list/reservation-list.component').then(m => m.ReservationListComponent)
  },
  {
    path: 'reservation',
    loadComponent: () => import('./reservation-form/reservation-form.component').then(m => m.ReservationFormComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./reservation-form/reservation-form.component').then(m => m.ReservationFormComponent)
  }
  // Add more routes here
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};