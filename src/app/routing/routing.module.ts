import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PagesModule } from '../pages/pages.module';
import { LoginComponent } from '../pages/login/login.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  { 
    path: '', 
    pathMatch: 'full', 
    redirectTo: '/login'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    PagesModule,
    SharedModule
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
