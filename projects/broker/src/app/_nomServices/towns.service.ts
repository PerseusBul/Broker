import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
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
export class TownsService implements INomService<number, {}> {
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
   * Get a datasource for towns
   * Get a datasource for towns
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getTowns(observe?: 'body', reportProgress?: boolean): Observable<Array<INomVO<number>>>;
  public getTowns(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<INomVO<number>>>>;
  public getTowns(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<INomVO<number>>>>;
  public getTowns(observe: any = 'body', reportProgress: boolean = false): Observable<any> {
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

    return this.httpClient.request<Array<INomVO<number>>>('get', `${this.basePath}/towns`, {
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress
    });
  }

  /**
   * Get a datasource for towns by district id and municipality id
   * Get a datasource for towns by district id and municipality id
   * @param districtId
   * @param municipalityId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getTownsByDistrictIdAndMunicipalityId(
    districtId: number,
    municipalityId: number,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Array<INomVO<number>>>;
  public getTownsByDistrictIdAndMunicipalityId(
    districtId: number,
    municipalityId: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<INomVO<number>>>>;
  public getTownsByDistrictIdAndMunicipalityId(
    districtId: number,
    municipalityId: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Array<INomVO<number>>>>;
  public getTownsByDistrictIdAndMunicipalityId(
    districtId: number,
    municipalityId: number,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (districtId === null || districtId === undefined) {
      throw new Error(
        'Required parameter districtId was null or undefined when calling getTownsByDistrictIdAndMunicipalityId.'
      );
    }

    if (municipalityId === null || municipalityId === undefined) {
      throw new Error(
        'Required parameter municipalityId was null or undefined when calling getTownsByDistrictIdAndMunicipalityId.'
      );
    }

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

    return this.httpClient.request<Array<INomVO<number>>>(
      'get',
      `${this.basePath}/districts/${encodeURIComponent(String(districtId))}/municipalities/${encodeURIComponent(
        String(municipalityId)
      )}/towns`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Get a datasource for towns
   * Get a datasource for towns
   * @param districtId
   * @param name
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getTownsByDistrictIdAndNames(
    districtId: number,
    name: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Array<INomVO<number>>>;
  public getTownsByDistrictIdAndNames(
    districtId: number,
    name: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<INomVO<number>>>>;
  public getTownsByDistrictIdAndNames(
    districtId: number,
    name: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Array<INomVO<number>>>>;
  public getTownsByDistrictIdAndNames(
    districtId: number,
    name: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (districtId === null || districtId === undefined) {
      throw new Error('Required parameter districtId was null or undefined when calling getTownsByDistrictIdAndNames.');
    }

    if (name === null || name === undefined) {
      throw new Error('Required parameter name was null or undefined when calling getTownsByDistrictIdAndNames.');
    }

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

    return this.httpClient.request<Array<INomVO<number>>>(
      'get',
      `${this.basePath}/districts/${encodeURIComponent(String(districtId))}/towns/${encodeURIComponent(String(name))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Get a datasource for towns by municipality id
   * Get a datasource for towns by municipality id
   * @param municipalityId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getTownsByMunicipalityId(
    municipalityId: number,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Array<INomVO<number>>>;
  public getTownsByMunicipalityId(
    municipalityId: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<INomVO<number>>>>;
  public getTownsByMunicipalityId(
    municipalityId: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Array<INomVO<number>>>>;
  public getTownsByMunicipalityId(
    municipalityId: number,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (municipalityId === null || municipalityId === undefined) {
      throw new Error('Required parameter municipalityId was null or undefined when calling getTownsByMunicipalityId.');
    }

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

    return this.httpClient.request<Array<INomVO<number>>>(
      'get',
      `${this.basePath}/municipalities/${encodeURIComponent(String(municipalityId))}/towns`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Get a datasource for towns by municipality id and name
   * Get a datasource for towns by municipality id and name
   * @param municipalityId
   * @param name
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getTownsByMunicipalityIdAndNames(
    municipalityId: number,
    name: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Array<INomVO<number>>>;
  public getTownsByMunicipalityIdAndNames(
    municipalityId: number,
    name: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<INomVO<number>>>>;
  public getTownsByMunicipalityIdAndNames(
    municipalityId: number,
    name: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Array<INomVO<number>>>>;
  public getTownsByMunicipalityIdAndNames(
    municipalityId: number,
    name: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (municipalityId === null || municipalityId === undefined) {
      throw new Error(
        'Required parameter municipalityId was null or undefined when calling getTownsByMunicipalityIdAndNames.'
      );
    }

    if (name === null || name === undefined) {
      throw new Error('Required parameter name was null or undefined when calling getTownsByMunicipalityIdAndNames.');
    }

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

    return this.httpClient.request<Array<INomVO<number>>>(
      'get',
      `${this.basePath}/municipalities/${encodeURIComponent(String(municipalityId))}/towns/${encodeURIComponent(
        String(name)
      )}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  getNomsById(params: GetNomsByIdParams<number>, filter: number): Observable<Array<INomVO<number>>> {
    return this.getTownsByMunicipalityId(filter);
  }

  getNomsByTerm({ term }: GetNomsByTermParams, filter: number): Observable<Array<INomVO<number>>> {
    return this.getTownsByMunicipalityIdAndNames(filter, term ?? '');
  }
}
