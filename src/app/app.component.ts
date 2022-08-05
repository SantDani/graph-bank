import { Component, OnInit } from '@angular/core';
import { Bank } from './models/Bank.model';
import { HttpClient } from "@angular/common/http";


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

  public bankArray: Bank[];
  public bankSummary: { [key: string]: any } = {};



  constructor(private httpClient: HttpClient) {
    this.bankArray = [];
    // this.bankSummary = {};


  }
  ngOnInit(): void {
    this.readCSV('assets/payments500000v2.csv')


    console.log("🚀 ~ file: app.component.ts this.bankSummary", this.bankSummary)
  }



  private readCSV(path: string) {
    this.httpClient.get(path, { responseType: 'text' }).subscribe(
      data => {
        let bankCSV = data.split("\n");
        for (let index = 1; index < bankCSV.length - 1; index++) {
          // for (let index = 1; index < 20; index++) { //TODO.. remove
          // const element = array[index];

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

          let row = bankCSV[index].split(",");
          const currentBank = new Bank(row[4], parseInt(row[0], 10))
          this.bankArray.push(currentBank)
          console.log("🚀 ~ file: app.component.ts ~ line 39 ~ AppComponent ~ constructor ~ this.bankArray", this.bankArray)



          if (!this.bankSummary.hasOwnProperty(currentBank.getName())) {
            this.bankSummary[currentBank.getName()] = currentBank.getTotalPrice();
          } else {
            this.bankSummary[currentBank.getName()] = currentBank.getTotalPrice() + this.bankSummary[currentBank.getName()];
          }

        }
      }, error => {
        console.error(error)
      }
    )
  }
}
