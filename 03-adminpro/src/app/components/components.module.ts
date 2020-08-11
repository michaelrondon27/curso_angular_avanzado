import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';

@NgModule({
  declarations: [
    DonaComponent,
    IncrementadorComponent
  ],
  exports: [
    DonaComponent,
    IncrementadorComponent
  ],
  imports: [
    ChartsModule,
    CommonModule,
    FormsModule
  ]
})
export class ComponentsModule { }
