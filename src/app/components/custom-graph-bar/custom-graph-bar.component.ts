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
  /**Data source of graph */
  @Input() public dataSource: IDataSource[] = [];


  constructor() { }

  ngOnInit(): void {
  }

}
