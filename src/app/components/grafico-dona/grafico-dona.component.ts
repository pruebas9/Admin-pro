import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

// Insertamos 'algo' (datos o lo que sea) en nuestro componente
@Input('chartLabels') doughnutChartLabels: string[] = [];
@Input('chartData') doughnutChartData: number[] = [];
@Input('chartType') doughnutChartType: string = '';

  constructor() { }

  ngOnInit() {
  }

}
