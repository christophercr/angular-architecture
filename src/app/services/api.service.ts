import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {environment} from '@environment';

// services
import {ErrorsHandler} from '@services/errors-handler.service';
import {Session} from '@services/session.service';
import {Translate} from '@services/translate.service';

@Injectable({
  providedIn: 'root'
})
export class Api {

  constructor(
    private httpClient: HttpClient,
    private translate: Translate,
    private session: Session,
    private errorsHandler: ErrorsHandler,
  ) {
  }

  get(endPoint: string, query?: object): Observable<any> {
    const httpOptions = this.getOptions(query);

    if (/ping$/.test(endPoint)) {
      httpOptions['responseType'] = 'text';
    }

    return this.httpClient.get(environment.apiUrl + endPoint, httpOptions).pipe(
      catchError((error) => this.errorsHandler.handle(error))
    );
  }

  post(endPoint: string, body?: object, query?: object, formData: boolean = false): Observable<any> {
    if (formData) body = this.formatAsFormData(body);

    return this.httpClient.post(environment.apiUrl + endPoint, body, this.getOptions(query, formData)).pipe(
      catchError((error) => this.errorsHandler.handle(error))
    );
  }

  put(endPoint: string, body?: object, query?: object, formData: boolean = false): Observable<any> {
    if (formData) body = this.formatAsFormData(body);

    return this.httpClient.put(environment.apiUrl + endPoint, body, this.getOptions(query, formData)).pipe(
      catchError((error) => this.errorsHandler.handle(error))
    );
  }

  patch(endPoint: string, body?: object, query?: object, formData: boolean = false): Observable<any> {
    if (formData) body = this.formatAsFormData(body);

    return this.httpClient.patch(environment.apiUrl + endPoint, body, this.getOptions(query, formData)).pipe(
      catchError((error) => this.errorsHandler.handle(error))
    );
  }

  delete(endPoint: string, query?: object): Observable<any> {
    return this.httpClient.delete(environment.apiUrl + endPoint, this.getOptions(query)).pipe(
      catchError((error) => this.errorsHandler.handle(error))
    );
  }

  // get headers and params formatted
  private getOptions(query?: object, formData: boolean = false): { headers: HttpHeaders, params: HttpParams } {
    let headers: HttpHeaders = new HttpHeaders();

    // user connected
    if (this.session.token) headers = headers.append('Authorization', 'Bearer ' + this.session.token);

    // not a file upload
    if (!formData) headers = headers.append('Content-type', 'application/json');

    headers = headers.append('Accept-Language', this.translate.currentLang
    );

    return {headers, params: query as HttpParams};
  }

  public formatAsFormData(obj: object): FormData {
    const formData = new FormData();

    Object.keys(obj).forEach((key) =>
      formData.append(key, obj[key], obj[key].name)
    );

    return formData;
  }
}
