import {Injectable} from '@angular/core';
import {mergeDeepRight, omit} from 'ramda';

// services
import {UrlHandler} from '@services/url-handler.service';

// helpers
import {decodeCollectionParams, encodeCollectionParams} from '@helpers/collection-params.helper';

// models
import {CollectionParams} from '@models/api/collection-params';

@Injectable({
  providedIn: 'root',
})
export class Search {
  params: CollectionParams = new CollectionParams();

  constructor(
    private urlHandler: UrlHandler
  ) {
  }

  handleResult<T>(currentItems: T[], newItems: T[]): T[] {
    // reset collection if new search
    if (this.params.page === 1) return newItems;

    // add to collection if pagination
    return [...currentItems, ...newItems];
  }

  retrieveParamsSaved(): void {
    // merge init params with url params
    this.params = mergeDeepRight(
      this.params,
      decodeCollectionParams(this.urlHandler.getQueryParams())
    ) as CollectionParams;
  }

  saveParams(): void {
    // don't save pagination, handle by infinite scroll
    const paramsToSave = omit(['page', 'limit'], this.params);
    const params = encodeCollectionParams(paramsToSave);
    this.urlHandler.setQueryParams(params);
  }

  reset(): void {
    this.params = new CollectionParams();
  }

  resetSearch(): void {
    this.params.search = {};
    this.params.logic = undefined;
    this.resetPagination();
  }

  resetPagination(): void {
    this.params.page = 1;
  }
}
