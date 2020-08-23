import {Component, EventEmitter, OnInit, Output} from '@angular/core';

// services
import {Search} from '@core/api/services/search.service';

// models
import {CollectionParams, LogicSearch} from '@core/api/entities/collection-params';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
})
export class SearchUsersComponent implements OnInit {
  @Output() load: EventEmitter<CollectionParams> = new EventEmitter(); // function to load items

  constructor(
    public search: Search,
  ) {
  }

  ngOnInit(): void {
    this.initSearch();
  }

  initSearch(): void {
    this.search.params.search.firstName = {type: 'STARTS'};
    this.search.params.search.lastName = {type: 'STARTS'};
    this.search.params.search.email = {type: 'CONTAINS'};
  }

  submit(): void {
    this.search.resetPagination();

    // use value of firstName to also search on lastName and email with OR
    this.search.params.search.lastName.value = this.search.params.search.firstName.value;
    this.search.params.search.email.value = this.search.params.search.firstName.value;
    this.search.params.logic = LogicSearch.OR;

    this.load.emit(this.search.params);
  }

  reset(): void {
    this.search.resetSearch();
    this.initSearch();
    this.load.emit(this.search.params);
  }

  get searchText(): string | undefined {
    return this.search.params.search.firstName.value;
  }

  set searchText(value: string | undefined) {
    this.search.params.search.firstName.value = value;
  }
}
