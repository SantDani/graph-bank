import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Bank } from 'src/app/models/bank.model';



@Component({
  selector: 'app-table-registers',
  templateUrl: './table-registers.component.html',
  styleUrls: ['./table-registers.component.scss']
})
export class TableRegistersComponent implements OnInit {
  public readonly displayedColumns: string[] = [
    'total',
    'bank',
    'creditCard',
    'numberItems',
    'dateTime',
    'retailType',
    'retailCategory',
    'country',
  ]
  @Input() public maxRegistersPaginate: number = 1000;
  @Input() public textSearch: string = '';
  @Input() public pageSizeOptions: number[] = [5, 10, 20, 50, 100];
  @Input()
  set dataSource(registerBanks: Bank[]) {
    this._dataSource = new MatTableDataSource<Bank>(registerBanks);
    this.cdr.detectChanges();
    this._dataSource.paginator = this.paginator
  }
  public _dataSource = new MatTableDataSource<Bank>();

  @ViewChild(MatPaginator)
  // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
  // paginator can't be non-null and non-undefined,
  //  the ! non-null assertion operator is simply removed in the emitted JavaScript code.
  paginator!: MatPaginator;


  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

}
