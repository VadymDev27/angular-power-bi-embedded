import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelsModule } from '../models/models.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ModelsModule
  ]
})
export class ServicesModule { }
