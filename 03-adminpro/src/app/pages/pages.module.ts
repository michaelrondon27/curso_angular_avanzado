import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Modulos
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';

@NgModule({
  declarations: [
    AccountSettingsComponent,
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    ProgressComponent,
    PromesasComponent
  ],
  exports: [
    AccountSettingsComponent,
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    ProgressComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    RouterModule,
    SharedModule,
  ]
})
export class PagesModule { }
