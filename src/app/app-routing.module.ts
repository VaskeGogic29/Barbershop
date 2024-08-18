import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'pocetna',
    pathMatch: 'full'
  },
  {
    path: 'pocetna',
    loadChildren: () => import('./pocetna/pocetna.module').then( m => m.PocetnaPageModule),
    canLoad: [AuthGuard]  

  },
  {
    path: 'termini',
    loadChildren: () => import('./termini/termini.module').then( m => m.TerminiPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'zaposleni',
    loadChildren: () => import('./zaposleni/zaposleni.module').then( m => m.ZaposleniPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
