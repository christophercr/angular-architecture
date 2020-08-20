import {Injectable} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UrlHandler {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  getQueryParams(): Params {
    return this.activatedRoute.snapshot.queryParams;
  }

  setQueryParams(queryParams: Params): void {
    this.router.navigate([], {queryParams});
  }
}
