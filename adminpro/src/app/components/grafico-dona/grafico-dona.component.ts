import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input('chartLabels') chartLabels: string[] = [];
  @Input('chartData') chartData: number[] = [];
  @Input('chartType') chartType: string = '';

  constructor() { }

  ngOnInit() {
  }

}
