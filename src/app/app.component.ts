import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { lastValueFrom, map, Observable } from 'rxjs';
import { Bank } from './models/bank.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'prenomics-bank';

  public loading: boolean;
  public creditCardsReady: boolean;
  public bankArray: Bank[];
  public bankSummary: { [key: string]: any };
  public bankCreditCards = new Set();

  public saleData: { name: string, value: number }[];


  constructor(private httpClient: HttpClient) {
    this.bankArray = [];
    this.bankSummary = {}
    this.loading = false;
    this.saleData = [];
    this.creditCardsReady = false;


  }
  async ngOnInit(): Promise<void> {

    const result$ = this.readCSV('assets/payments500000v2.csv');
    this.loading = true;
    const data = await lastValueFrom(result$)
    this.loading = false;

    this.processData(data)
    this.loadGraph();


  }

  /**
   * @param data string with all the database
   */
  private processData(data: string) {

    let bankCSV = data.split("\n");
    for (let index = 1; index < bankCSV.length - 1; index++) {
      let row = bankCSV[index].split(",");

      const currentBank = new Bank(row)
      this.bankArray.push(currentBank)
      this.aggregateCurrentBank(currentBank);
      this.setCreditCard(currentBank);
    }
    this.creditCardsReady = true;

  }
  setCreditCard(currentBank: Bank) {
    this.bankCreditCards.add(currentBank.getCreditCard());
  }

  private aggregateCurrentBank(currentBank: Bank) {
    if (!this.bankSummary.hasOwnProperty(currentBank.getName())) {
      this.bankSummary[currentBank.getName()] = currentBank.getTotalPrice();
    } else {
      this.bankSummary[currentBank.getName()] = currentBank.getTotalPrice() + this.bankSummary[currentBank.getName()];
    }
  }
  private loadGraph() {
    Object.keys(this.bankSummary).forEach(key => {
      this.saleData.push({ name: key, value: this.bankSummary[key] })
    })

  }

  private readCSV(path: string) {
    return this.httpClient.get(path, { responseType: 'text' }).pipe(
      map(response => response)
    );

  }

}
