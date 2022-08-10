import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { Bank } from 'src/app/models/bank.model';
import { ReadFilesService } from 'src/app/services/readFiles/read-files.service';
import { SearchService } from 'src/app/services/search/search.service';
import { IDataSource } from '../custom-graph-bar/custom-graph-bar.component';

export declare interface IBankSummary {
  [key: string]: any;

}
@Component({
  selector: 'app-custom-aggregate-banks',
  templateUrl: './custom-aggregate-banks.component.html',
  styleUrls: ['./custom-aggregate-banks.component.scss'],
  providers: [SearchService]
})
export class CustomAggregateBanksComponent implements OnInit {

  /** Contains all the registers from banks */
  public bankArray: Bank[] = [];
  public bankArrayFiltered: Bank[] = [];
  /** Contains the sum total of the banks' records */
  public bankSummary: IBankSummary = {};
  /** Contains the sum total of the banks filter by a credit card */
  public bankSummaryCreditCard: IBankSummary = {};
  /** Data of graph */
  public dataSource: IDataSource[] = [];
  /** Contains all the names of credit cards */
  public bankCreditCards: string[] = [];

  public totalMatch: number = 0;
  public filterTextOn: boolean = false;
  public textSearch: string = '';

  /**
   * Inject dependencies
   * @param readFilesService Allows read files 
   */
  constructor(private readFilesService: ReadFilesService, private searchService: SearchService) { }

  /**
   * Init component
   */
  public async ngOnInit(): Promise<void> {
    try {

      const result$ = this.readFilesService.readCSV('assets/payments500000v2.csv');
      const data = await lastValueFrom(result$)
      this.bankArray = this.searchService.loadData(data, 100);
      this.aggregateCurrentBank()
      this.bankCreditCards = this.setCreditCard(this.bankArray);
      this.loadGraph(this.bankSummary);

    } catch (error) {
      console.error(error)
    }
  }

  private loadGraph(bankSummary: IBankSummary): void {
    this.dataSource = [];
    Object.keys(bankSummary).forEach(key => {
      this.dataSource.push({ name: key, value: bankSummary[key] })
    })

    // this.dataSource.sort((a, b) => (a.name > b.name) ? 1 : -1)
    this.totalMatch = this.searchService.getTotalMatch();
    this.dataSource.sort((a, b) => (a.name > b.name) ? 1 : -1)
    // this.dataSource = [...this.dataSource];// refresh
  }

  private aggregateCurrentBank() {
    for (let index = 1; index < this.bankArray.length; index++) {
      if (!this.bankSummary.hasOwnProperty(this.bankArray[index].name)) {
        this.bankSummary[this.bankArray[index].name] = this.bankArray[index].totalPrice;
      } else {
        this.bankSummary[this.bankArray[index].name] = this.bankArray[index].totalPrice + this.bankSummary[this.bankArray[index].name];
      }
    }
  }

  private setCreditCard(registerBanks: Bank[]): string[] {
    const creditCardNames = new Set('');
    registerBanks.map(register => creditCardNames.add(register.creditCard))

    return Array.from(creditCardNames).sort();
  }

  public filterByCard(creditCard: string) {
    const summaryByCreditCards = this.searchService.filterByCard(creditCard);
    if (Object.keys(summaryByCreditCards).length > 0 && creditCard.length > 0) this.loadGraph(summaryByCreditCards)
    else this.loadGraph(this.bankSummary)
  }

  public filterByText(textSearch: string) {
    this.totalMatch = this.searchService.getTotalMatch();
    this.textSearch = textSearch;
    this.bankArrayFiltered = this.searchService.getRegisterFiltered();
    this.filterTextOn = textSearch.length > 0

  }

  public filter(filter: string, typeSearch: string) {
    this.filterTextOn = filter.length > 0;
    switch (typeSearch) {
      case 'selector':
        this.filterByCard(filter);
        this.bankArrayFiltered = this.searchService.getRegisterFiltered();
        break;
      case 'text':
        this.filterByText(filter);
        this.bankArrayFiltered = this.searchService.getRegisterFiltered();
        if (this.filterTextOn) {
          const summary = this.searchService.getSummaryGraph();
          this.loadGraph(summary)
        } else {
          this.loadGraph(this.bankSummary);
        }

        break;
      default:
        break;
    }

  }
}
