import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { lastValueFrom, map, Observable } from 'rxjs';
import { Bank } from './models/bank.model';


interface BankSummary {
  bank: string;
  total: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'prenomics-bank';

  public loading: boolean;
  public bankArray: Bank[];
  public bankSummary: { [key: string]: any };

  public saleData: { name: string, value: number }[] = [
    { name: "Mobiles", value: 105000 },
    { name: "Laptop", value: 55000 },
    { name: "AC", value: 15000 },
    { name: "Headset", value: 150000 },
    { name: "Fridge", value: 20000 }
  ];


  constructor(private httpClient: HttpClient) {
    this.bankArray = [];
    this.bankSummary = {}
    this.loading = false;

  }
  async ngOnInit(): Promise<void> {

    const result$ = this.readCSV('assets/payments500000v2.csv');
    this.loading = true;
    const data = await lastValueFrom(result$)
    this.loading = false;

    this.processData(data)
    this.loadGraph();

  }

  private processData(data: string) {

    let bankCSV = data.split("\n");
    for (let index = 1; index < bankCSV.length - 1; index++) {
      // for (let index = 1; index < 100; index++) {
      let row = bankCSV[index].split(",");

      /**
       *  order:
       *   1 - total_price
       *   2 - number_of_items
       *   3 - datetime
       *   4 - credit_card
       *   5 - bank
       *   6 - retail_type
       *   7 - retail_category
       *   8 - country
       */
      const currentBank = new Bank(row[4], parseInt(row[0], 10))
      this.bankArray.push(currentBank)
      this.aggregateCurrentBank(currentBank);
    }


  }

  private aggregateCurrentBank(currentBank: Bank) {
    if (!this.bankSummary.hasOwnProperty(currentBank.getName())) {
      this.bankSummary[currentBank.getName()] = currentBank.getTotalPrice();
    } else {
      this.bankSummary[currentBank.getName()] = currentBank.getTotalPrice() + this.bankSummary[currentBank.getName()];
    }
  }
  private loadGraph() {

    // console.log("🚀 ~ file: app.component.ts ~ line 45 ~ AppComponent ~ Object.keys ~ Object.keys(this.bankSummary)", Object.keys(this.bankSummary))
    Object.keys(this.bankSummary).forEach(key => {
      console.log("🚀 ~ file: app.component.ts ~ line 47 ~ AppComponent ~ Object.keys ~ key", key)
      this.saleData.push({ name: key, value: this.bankSummary[key] })

    })




    console.log("🚀 ~ file: app.component.ts ~ line 88 ~ AppComponent ~ loadGraph ~ this.saleData", this.saleData)
  }

  private readCSV(path: string) {
    return this.httpClient.get(path, { responseType: 'text' }).pipe(
      map(response => response)
    );

  }

}
