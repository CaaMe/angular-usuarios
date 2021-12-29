import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UsuarioComponent } from './pages/home/usuario/usuario.component';

const routes: Routes = [
  { path: 'home'    , component: HomeComponent }, 
  { path: 'login'   , component: LoginComponent },
  { path: 'usuario/:id'   , component: UsuarioComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
