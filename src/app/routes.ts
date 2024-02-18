import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoggedLayoutComponent } from './layouts/logged-layout/logged-layout.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'app',
    component: LoggedLayoutComponent,
    canActivate: [authGuard],
    children: [{ path: 'dashboard', component: DashboardComponent }],
  },
  { path: '**', component: NotFoundComponent },
];
