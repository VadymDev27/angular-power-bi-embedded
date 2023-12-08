import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        }
      }
    })
  ],
  providers: [
    JwtHelperService
  ]
})
export class SharedModule { }
