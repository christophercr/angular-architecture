import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// guards
import {AdminGuard} from '@guards/admin.guard';
import {ConnectedGuard} from '@guards/connected.guard';
import {NotConnectedGuard} from '@guards/not-connected.guard';

// components
import {NotFoundComponent} from '@pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [ConnectedGuard],
    canActivateChild: [ConnectedGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [NotConnectedGuard],
    canActivateChild: [NotConnectedGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [ConnectedGuard],
    canActivateChild: [ConnectedGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule),
    canActivate: [AdminGuard],
    canActivateChild: [AdminGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
