import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import {Subscription} from 'rxjs';

// services
import {Search} from '@services/search.service';

// models
import {CollectionParams} from '@models/api/collection-params';

// components
import {TableColComponent} from '@components/table/table-col/table-col.component';

// config
import {LINES_HEIGHT} from '@models/lines-height-config';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})
export class TableComponent implements OnChanges, OnDestroy, AfterContentInit {
  @Output() load: EventEmitter<CollectionParams> = new EventEmitter(); // function to load items
  @Input() items: any[]; // items of table
  @Input() lineHeight = 'medium'; // size of a line to calculate number of items to load on init
  @Input() scrollContainerRef: ElementRef; // global container to calculate height size
  @Input() scrollContainerSelector = '.scrollContainer'; // scroll listener
  @Input() scrollDisabled = false;

  // passing 'descendants' option because the TableColComponent(s) are not direct children in the content
  @ContentChildren(TableColComponent, {descendants: true}) columnComponents: TableColComponent[];

  private colSubscriptions: Subscription[] = [];

  constructor(
    private search: Search
  ) {
  }

  ngAfterContentInit() {
    console.log('---- columns', this.columnComponents);
    this.listenToColumnEvents();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // load items when scrollContainer is init
    if (changes.scrollContainerRef) {
      this.init(changes.scrollContainerRef.currentValue.nativeElement.offsetHeight);
    }

    // save params in url after request succeed
    if (changes.items) {
      this.search.saveParams();
    }
  }

  ngOnDestroy(): void {
    this.search.reset();
    for (const subscription of this.colSubscriptions) {
      subscription.unsubscribe();
    }
  }

  private listenToColumnEvents(): void {
    this.columnComponents.forEach((column) => {
      const subscription = column.orderTable.subscribe((order: string[]) => {
        this.search.resetPagination();
        this.search.params.order = order;
        this.load.emit(this.search.params);
      });
      this.colSubscriptions.push(subscription);
    });
  }

  private init(viewHeight: number): void {
    this.search.retrieveParamsSaved();

    if (this.scrollDisabled) {
      this.load.emit(this.search.params);
    } else {
      this.search.params.limit = this.getNumberItemsToLoad(viewHeight);
      this.load.emit(this.search.params);
    }
  }

  private getNumberItemsToLoad(viewHeight: number): number {
    const lineHeight = LINES_HEIGHT[this.lineHeight] || LINES_HEIGHT.medium;

    return Math.floor(viewHeight / lineHeight);
  }

  loadMore(): void {
    this.search.params.page++;
    this.load.emit(this.search.params);
  }
}
