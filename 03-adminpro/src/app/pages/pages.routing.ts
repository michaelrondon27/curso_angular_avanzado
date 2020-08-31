import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'account-settings',
                component: AccountSettingsComponent
            },
            {
                path: 'grafica1',
                component: Grafica1Component
            },
            {
                path: 'progress',
                component: ProgressComponent
            },
            {
                path: 'promesas',
                component: PromesasComponent
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class PagesRoutingModule {}
