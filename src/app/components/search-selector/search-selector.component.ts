import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-selector',
  templateUrl: './search-selector.component.html',
  styleUrls: ['./search-selector.component.scss']
})
export class SearchSelectorComponent implements OnInit {

  @Input()
  set setCards(setCards: any) {
    this.cards = Array.from(setCards);
  }
  public cards: string[] = [];

  @Input() public loading: boolean = true;


  constructor() {
  }

  ngOnInit(): void {
  }

}
