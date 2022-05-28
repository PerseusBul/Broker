import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Configuration } from 'projects/broker-api';
import {
  GetNomsByIdParams,
  GetNomsByTermParams,
  INomService,
  INomVO
} from 'projects/shared/components/nom-select/nom-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PinTypesService implements INomService<string, {}> {
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
   * Get a datasource for pintypes
   * Get a datasource for pintypes
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public pinTypes(observe?: 'body', reportProgress?: boolean): Observable<INomVO<string>[]>;
  public pinTypes(observe?: 'response', reportProgress?: boolean): Observable<INomVO<string>[]>;
  public pinTypes(observe?: 'events', reportProgress?: boolean): Observable<INomVO<string>[]>;
  public pinTypes(observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    let headers = this.defaultHeaders;

    // authentication (Bearer) required
    if (this.configuration.apiKeys && this.configuration.apiKeys['Authorization']) {
      headers = headers.set('Authorization', this.configuration.apiKeys['Authorization']);
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['text/plain', 'application/json', 'text/json'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<Observable<INomVO<string>[]>>('get', `${this.basePath}/pintypes`, {
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress
    });
  }

  getNomsById(params: GetNomsByIdParams<string>, filter: number): Observable<Array<INomVO<string>>> {
    return this.pinTypes();
  }

  getNomsByTerm({ term }: GetNomsByTermParams, filter: number): Observable<Array<INomVO<string>>> {
    return this.pinTypes();
  }
}
