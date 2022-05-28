import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpParams,
  HttpResponse, HttpEvent
} from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from 'projects/crm-api/encoder';

import { Observable } from 'rxjs';

import { Configuration } from 'projects/crm-api';
import { GetNomsByIdParams, GetNomsByTermParams, INomService, INomVO } from 'projects/shared/components/nom-select/nom-service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DistrictsService implements INomService<number, {}> {

  protected basePath = '/';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient, @Optional() configuration: Configuration) {
    this.basePath = environment.apiUrl;

    if (configuration) {
      this.configuration = configuration;
    }
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data';
    for (const consume of consumes) {
      if (form === consume) {
        return true;
      }
    }
    return false;
  }

  /**
   * Get a datasource for districts
   * Get a datasource for districts
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public districtsGet(observe?: 'body', reportProgress?: boolean): Observable<Array<INomVO<number>>>;
  public districtsGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<INomVO<number>>>>;
  public districtsGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<INomVO<number>>>>;
  public districtsGet(observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    let headers = this.defaultHeaders;

    // authentication (Bearer) required
    if (this.configuration.apiKeys && this.configuration.apiKeys['Authorization']) {
      headers = headers.set('Authorization', this.configuration.apiKeys['Authorization']);
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      'text/plain',
      'application/json',
      'text/json'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
    ];

    return this.httpClient.request<Array<INomVO<number>>>('get', `${this.basePath}/districts`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
     * Get a datasource for districts by name
     * Get a datasource for districts by name
     * @param name
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
  public districtsGetByName(name: string, observe?: 'body', reportProgress?: boolean): Observable<Array<INomVO<number>>>;
  public districtsGetByName(name: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<INomVO<number>>>>;
  public districtsGetByName(name: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<INomVO<number>>>>;
  public districtsGetByName(name: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (name === null || name === undefined) {
      throw new Error('Required parameter name was null or undefined when calling districtsGet.');
    }

    let headers = this.defaultHeaders;

    // authentication (Bearer) required
    if (this.configuration.apiKeys && this.configuration.apiKeys['Authorization']) {
      headers = headers.set('Authorization', this.configuration.apiKeys['Authorization']);
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      'text/plain',
      'application/json',
      'text/json'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
    ];

    return this.httpClient.request<Array<INomVO<number>>>('get', `${this.basePath}/districts/${encodeURIComponent(String(name))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  getNomsById(params: GetNomsByIdParams<number>, filter: number): Observable<Array<INomVO<number>>> {
    return this.districtsGet();
  }

  getNomsByTerm({ term }: GetNomsByTermParams, filter: number): Observable<Array<INomVO<number>>> {
    return this.districtsGetByName(term ?? '');
  }
}
