import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PowerBIEmbedModule } from 'powerbi-client-angular';
import { ServicesModule } from '../services/services.module';
import { ReportComponent } from './report/report.component';
import { LoginComponent } from './login/login.component';
import { ComponentsModule } from '../components/components.module';
import { ReportsComponent } from './reports/reports.component';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TilesComponent } from './tiles/tiles.component';
import { TileComponent } from './tile/tile.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from '../shared/guards/user-auth.guard';
import { AuthGuard } from '../shared/guards/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

const childRoutes: Routes = [
  {
    path: 'app',
    component: MainComponent,
    canActivate: [UserAuthGuard, AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [UserAuthGuard, AuthGuard]
      },
      {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [UserAuthGuard, AuthGuard]
      },
      {
        path: 'group/:groupId/report/:reportId',
        component: ReportComponent,
        canActivate: [UserAuthGuard, AuthGuard]
      },
      {
        path: 'dashboards',
        component: DashboardsComponent,
        canActivate: [UserAuthGuard, AuthGuard]
      },
      {
        path: 'group/:groupId/dashboard/:dashboardId',
        component: DashboardComponent,
        canActivate: [UserAuthGuard, AuthGuard]
      },
      {
        path: 'group/:groupId/dashboard/:dashboardId/tiles',
        component: TilesComponent,
        canActivate: [UserAuthGuard, AuthGuard]
      },
      {
        path: 'group/:groupId/dashboard/:dashboardId/tile/:tileId',
        component: TileComponent,
        canActivate: [UserAuthGuard, AuthGuard]
      }
    ]
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    ReportComponent,
    ReportsComponent,
    DashboardsComponent,
    DashboardComponent,
    TilesComponent,
    TileComponent,
    HomeComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    PowerBIEmbedModule,
    ServicesModule,
    ComponentsModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(childRoutes)
  ],
  exports: [
    LoginComponent,
    ReportComponent,
    ReportsComponent,
    DashboardsComponent,
    DashboardComponent,
    TilesComponent,
    TileComponent,
    HomeComponent,
    MainComponent
  ]
})
export class PagesModule { }
