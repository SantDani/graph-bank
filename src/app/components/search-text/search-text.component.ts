import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { text } from 'd3';
import { debounceTime, distinctUntilChanged, map, Observable, startWith, Subject } from 'rxjs';
import { Bank } from 'src/app/models/bank.model';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-search-text',
  templateUrl: './search-text.component.html',
  styleUrls: ['./search-text.component.scss'],

})
export class SearchTextComponent implements OnInit {
  @Input() debonuceTimeSearch = 100;
  @Output() onChange = new EventEmitter<string>();

  public results!: Observable<Bank[]>;
  queryField: FormControl = new FormControl();

  public textSearch: string;
  constructor(private searchService: SearchService) {
    this.textSearch = '';
  }

  ngOnInit(): void {
    this.results = this.queryField.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),  // discard an emission that will be a duplicate of its immediate predecessor
        map(textSearch => this.onChangeText(textSearch))
      )
  }


  public onChangeText(textSearch: string = this.queryField.value): Bank[] {
    this.onChange.emit(textSearch);
    return textSearch ? [...this.searchService.filterByString(textSearch).slice(0, 5)] : [];

  }
}
