import { Component, Input, OnInit } from '@angular/core';
/** */
export declare interface IDataSource {
  /** Name of  colum. Axis X */
  name: string;
  /** Value of Colum. Axis X */
  value: number;
}
@Component({
  selector: 'app-custom-graph-bar',
  templateUrl: './custom-graph-bar.component.html',
  styleUrls: ['./custom-graph-bar.component.scss']
})
export class CustomGraphBarComponent implements OnInit {
  /** Flag that displays spinner */
  public loading: boolean = false;
  /** The chart data */
  @Input()
  set dataSource(dataSource: IDataSource[]) {
    this.loading = true;
    this._dataSource = [...dataSource];
    this.loading = false;
  }
  public _dataSource: IDataSource[] = [];
  /** The dimensions of the chart [width, height]. If left undefined, the chart will fit to the parent container size */
  @Input() public view: [number, number] = [1200, 800];
  /** The legend title */
  @Input() public legendTitle: string = '';
  /** The x axis label text */
  @Input() public xAxisLabel: string = '';
  /** the y axis label text */
  @Input() public yAxisLabel: string = '';
  /** Show or hide legend */
  @Input() public legend: boolean = true;
  /** Show or hide the x axis label */
  @Input() public showXAxisLabel: boolean = true;
  /** Show or hide the y axis label */
  @Input() public showYAxisLabel: boolean = true;
  /** Show or hide the x axis */
  @Input() public xAxis: boolean = true;
  /** Show or hide the y axis */
  @Input() public yAxis: boolean = true;
  /** Fill elements with a gradient instead of a solid color */
  @Input() public gradient: boolean = true;
  /** Round edges for the bars*/
  @Input() public roundEdges: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
