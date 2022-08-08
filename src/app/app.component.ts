import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { lastValueFrom, map, Observable } from 'rxjs';
import { Bank } from './models/bank.model';
import { ReadFilesService } from './services/readFiles/read-files.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'prenomics-bank';

  public loading: boolean;
  public creditCardsReady: boolean;







  constructor() {


    this.loading = false;

    this.creditCardsReady = false;


  }
  async ngOnInit(): Promise<void> {

    this.loading = true;

    this.loading = false;
  }
  //TODO.. We will be back
  // public filterByCard(creditCard: string) {
  //   if (creditCard.length > 0) {
  //     this.loading = true;
  //     this.bankSummary = [];
  //     this.bankArray.map(bank => {
  //       if (bank.getCreditCard() === creditCard) {
  //         this.aggregateCurrentBank(bank)
  //       }
  //     })
  //     this.loading = false;
  //     this.loadGraph();
  //   }

  // }

}
