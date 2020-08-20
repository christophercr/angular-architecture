import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

// services
import {Search} from '@services/search.service';

// models
import {OrderDirection} from '@models/order-direction';

@Component({
  selector: 'th[table-col]',
  templateUrl: './table-col.component.html',
})
export class TableColComponent implements OnInit {
  @Output() orderTable = new EventEmitter<string[]>();
  @Input() sortable = true;
  @Input() field: string;
  orderDirection = OrderDirection;

  constructor(
    private search: Search
  ) {
  }

  ngOnInit(): void {
  }

  order(): void {
    if (!this.sortable || !this.field) return;

    this.orderTable.emit(this.getOrderFields());
  }

  private getOrderFields(): string[] {
    const orderDirection = this.getOrderDirection(this.field);

    return (orderDirection === OrderDirection.ASC) ? ['-' + this.field] : [this.field];
  }

  getOrderDirection(field: string): OrderDirection | undefined {
    if (!this.search.params.order) return undefined;

    if (this.search.params.order.includes(field)) return OrderDirection.ASC;
    if (this.search.params.order.includes('-' + field)) return OrderDirection.DESC;

    return undefined;
  }
}
