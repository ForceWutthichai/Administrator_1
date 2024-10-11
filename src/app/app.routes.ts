import { Routes } from '@angular/router';
import { GenadminComponent } from './pages/genadmin/genadmin.component';
import { HomeLayoutComponent } from './pages/home-layout/home-layout.component';
import { AllAdminComponent } from './pages/all-admin/all-admin.component';
import { UserAllComponent } from './pages/user-all/user-all.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/layout' },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.routes').then((m) => m.WELCOME_ROUTES),
  },
  {
    path: 'layout', component: HomeLayoutComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'addAdmin' },
      { path: 'addAdmin', component: GenadminComponent },
      { path: 'allAdmin', component: AllAdminComponent },
      { path: 'allUser', component: UserAllComponent },

    ]
  },
];
