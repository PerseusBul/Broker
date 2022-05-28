import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Configuration } from 'projects/crm-api';
import {
  GetNomsByIdParams,
  GetNomsByTermParams,
  INomService,
  INomVO
} from 'projects/shared/components/nom-select/nom-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class MunicipalitiesService implements INomService<number, {}> {
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
   * Get a datasource for municipalities
   * Get a datasource for municipalities
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getMunicipalities(observe?: 'body', reportProgress?: boolean): Observable<Array<INomVO<number>>>;
  public getMunicipalities(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<INomVO<number>>>>;
  public getMunicipalities(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<INomVO<number>>>>;
  public getMunicipalities(observe: any = 'body', reportProgress: boolean = false): Observable<any> {
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

    return this.httpClient.request<Array<INomVO<number>>>('get', `${this.basePath}/municipalities`, {
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress
    });
  }

  /**
   * Get a datasource for municipality by name
   * Get a datasource for municipality by name
   * @param districtId
   * @param name
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getMunicipalitiesByName(
    districtId: number,
    name: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Array<INomVO<number>>>;
  public getMunicipalitiesByName(
    districtId: number,
    name: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<INomVO<number>>>>;
  public getMunicipalitiesByName(
    districtId: number,
    name: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Array<INomVO<number>>>>;
  public getMunicipalitiesByName(
    districtId: number,
    name: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (districtId === null || districtId === undefined) {
      throw new Error('Required parameter districtId was null or undefined when calling getMunicipalitiesByName.');
    }

    if (name === null || name === undefined) {
      throw new Error('Required parameter name was null or undefined when calling getMunicipalitiesByName.');
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

  /**
   * Get a datasource for municipalities by district
   * Get a datasource for municipalities by district
   * @param districtId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getMunicipalityByDistrictId(
    districtId: number,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Array<INomVO<number>>>;
  public getMunicipalityByDistrictId(
    districtId: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<INomVO<number>>>>;
  public getMunicipalityByDistrictId(
    districtId: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Array<INomVO<number>>>>;
  public getMunicipalityByDistrictId(
    districtId: number,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (districtId === null || districtId === undefined) {
      throw new Error('Required parameter districtId was null or undefined when calling getMunicipalityByDistrictId.');
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
      `${this.basePath}/districts/${encodeURIComponent(String(districtId))}/municipalities`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  getNomsById(params: GetNomsByIdParams<number>, filter: number): Observable<Array<INomVO<number>>> {
    return this.getMunicipalityByDistrictId(filter);
  }

  getNomsByTerm({ term }: GetNomsByTermParams, filter: number): Observable<Array<INomVO<number>>> {
    return this.getMunicipalitiesByName(filter, term ?? '');
  }
}
