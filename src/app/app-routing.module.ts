import {Routes} from '@angular/router';

// guards
import {AdminGuard} from '@core/session/guards/admin.guard';
import {ConnectedGuard} from '@core/session/guards/connected.guard';
import {NotConnectedGuard} from '@core/session/guards/not-connected.guard';

// components
import {NotFoundComponent} from '@app/not-found.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [ConnectedGuard],
    canActivateChild: [ConnectedGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [NotConnectedGuard],
    canActivateChild: [NotConnectedGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
    canActivate: [ConnectedGuard, AdminGuard],
    canActivateChild: [ConnectedGuard, AdminGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

