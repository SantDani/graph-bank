import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'prenomics-bank';

  public loading: boolean;
  public creditCardsReady: boolean

  constructor() {


    this.loading = false;

    this.creditCardsReady = false;


  }
  async ngOnInit(): Promise<void> {

    this.loading = true;

    this.loading = false;
  }


}
