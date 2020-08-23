import {evolve, merge, omit, pipe} from 'ramda';

// models
import {Params} from '@angular/router';
import {CollectionParams, Search, SearchField} from '@core/api/entities/collection-params';

// encode CollectionParams to QueryParams
export function encodeCollectionParams(collectionParams?: Partial<CollectionParams>): Params {
  if (!collectionParams) return {};

  // @ts-ignore
  return pipe(
    omit(['search']),
    evolve({
      order: (order) => encodeOrder(order),
    }),
    merge(encodeSearch(collectionParams.search))
  )(collectionParams);
}

function encodeOrder(order: string[] = []): string {
  return order.toString();
}

function encodeSearch(search: Search = {}): Params {
  return Object.keys(search).reduce((acc: Params, key) => {
    const searchField = encodeSearchField(search[key]);
    if (searchField) acc[key] = searchField;

    return acc;
  }, {});
}

function encodeSearchField(searchField: SearchField): string {
  if (!searchField.value) return '';

  switch (searchField.type) {
    case 'STARTS':
      return `${searchField.value}*`;
    case 'ENDS':
      return `*${searchField.value}`;
    case 'CONTAINS':
    default:
      return `*${searchField.value}*`;
  }
}

// decode QueryParams to CollectionParams
export function decodeCollectionParams(queryParams: Params = {}): CollectionParams {
  return Object.keys(queryParams).reduce((acc, key) => {
    switch (key) {
      case 'logic':
        acc[key] = queryParams[key];
        break;
      case 'order':
        acc[key] = decodeOrder(queryParams.order);
        break;
      default:
        acc.search[key] = decodeSearchField(queryParams[key]);
        break;
    }

    return acc;
  }, new CollectionParams());
}

function decodeOrder(order: string): string[] {
  return order.split(',');
}

function decodeSearchField(field: string): SearchField {
  if (field.startsWith('*') && field.endsWith('*')) {
    return {
      value: field.substring(1, field.length - 1),
      type: 'CONTAINS',
    };
  }
  if (field.endsWith('*')) {
    return {
      value: field.substring(0, field.length - 1),
      type: 'STARTS',
    };
  }
  if (field.startsWith('*')) {
    return {
      value: field.substring(1, field.length),
      type: 'ENDS',
    };
  }

  return {};
}
