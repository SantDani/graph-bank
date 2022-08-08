import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { Bank } from 'src/app/models/bank.model';
import { ReadFilesService } from 'src/app/services/readFiles/read-files.service';
import { SearchService } from 'src/app/services/search/search.service';
import { IDataSource } from '../custom-graph-bar/custom-graph-bar.component';

@Component({
  selector: 'app-custom-aggregate-banks',
  templateUrl: './custom-aggregate-banks.component.html',
  styleUrls: ['./custom-aggregate-banks.component.scss'],
  providers: [SearchService]
})
export class CustomAggregateBanksComponent implements OnInit {

  /** Contains all the registers from banks */
  public bankArray: Bank[] = [];
  /** Contains the sum total of the banks' records */
  public bankSummary: { [key: string]: any } = {};
  /** Data of graph */
  public dataSource: IDataSource[] = [];

  /**  */
  public bankCreditCards = new Set();
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
      this.bankArray = this.searchService.loadData(data);
      this.aggregateCurrentBank()
      this.loadGraph();


    } catch (error) {
      console.error(error)
    }
  }

  private loadGraph() {
    Object.keys(this.bankSummary).forEach(key => {
      this.dataSource.push({ name: key, value: this.bankSummary[key] })
    })

    this.dataSource = [...this.dataSource];// refresh
  }



  private aggregateCurrentBank() {
    for (let index = 1; index < this.bankArray.length; index++) {
      if (!this.bankSummary.hasOwnProperty(this.bankArray[index].getName())) {
        this.bankSummary[this.bankArray[index].getName()] = this.bankArray[index].getTotalPrice();
      } else {
        this.bankSummary[this.bankArray[index].getName()] = this.bankArray[index].getTotalPrice() + this.bankSummary[this.bankArray[index].getName()];
      }
    }
  }

  setCreditCard(currentBank: Bank) {
    this.bankCreditCards.add(currentBank.getCreditCard());
  }


}
