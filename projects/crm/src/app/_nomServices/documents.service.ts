import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Configuration } from 'projects/crm-api';
import { ClaimDocumentsBody } from 'projects/crm-api/model/claimDocumentsBody';
import { DocumentsUploadBody } from 'projects/crm-api/model/documentsUploadBody';
import { GetClaimDocumentFileResponse } from 'projects/crm-api/model/getClaimDocumentFileResponse';
import { GetClaimDocumentsResponse } from 'projects/crm-api/model/getClaimDocumentsResponse';
import { GetClaimDocumentTypesResponse } from 'projects/crm-api/model/getClaimDocumentTypesResponse';
import { UploadClaimDocumentsResponse } from 'projects/crm-api/model/uploadClaimDocumentsResponse';
import {
  GetNomsByIdParams,
  GetNomsByTermParams,
  INomService,
  INomVO
} from 'projects/shared/components/nom-select/nom-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DocumentsService {

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
     * Get documents for specific claim
     * Get documents for specific claim
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getClaimDocuments(body?: ClaimDocumentsBody, observe?: 'body', reportProgress?: boolean): Observable<GetClaimDocumentsResponse>;
    public getClaimDocuments(body?: ClaimDocumentsBody, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GetClaimDocumentsResponse>>;
    public getClaimDocuments(body?: ClaimDocumentsBody, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GetClaimDocumentsResponse>>;
    public getClaimDocuments(body?: ClaimDocumentsBody, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<GetClaimDocumentsResponse>('post',`${this.basePath}/claim/documents`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get a datasource for claim document types by insurance type
     * Get a datasource for claim document types by insurance type
     * @param insuranceTypeCode 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getClaimDocumentTypesByInsuranceType(insuranceTypeCode: string, observe?: 'body', reportProgress?: boolean): Observable<GetClaimDocumentTypesResponse>;
    public getClaimDocumentTypesByInsuranceType(insuranceTypeCode: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GetClaimDocumentTypesResponse>>;
    public getClaimDocumentTypesByInsuranceType(insuranceTypeCode: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GetClaimDocumentTypesResponse>>;
    public getClaimDocumentTypesByInsuranceType(insuranceTypeCode: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (insuranceTypeCode === null || insuranceTypeCode === undefined) {
            throw new Error('Required parameter insuranceTypeCode was null or undefined when calling getClaimdocumenttypesByInsurancetype.');
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

        return this.httpClient.request<GetClaimDocumentTypesResponse>('get',`${this.basePath}/claimDocumentTypes/${encodeURIComponent(String(insuranceTypeCode))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get a file for specific document
     * Get a file for specific document
     * @param claimNumber 
     * @param fileId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getFileByClaimNumberAndFileId(claimNumber: string, fileId: number, observe?: 'body', reportProgress?: boolean): Observable<GetClaimDocumentFileResponse>;
    public getFileByClaimNumberAndFileId(claimNumber: string, fileId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GetClaimDocumentFileResponse>>;
    public getFileByClaimNumberAndFileId(claimNumber: string, fileId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GetClaimDocumentFileResponse>>;
    public getFileByClaimNumberAndFileId(claimNumber: string, fileId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (claimNumber === null || claimNumber === undefined) {
            throw new Error('Required parameter claimNumber was null or undefined when calling getFileByClaimnumberAndFileid.');
        }

        if (fileId === null || fileId === undefined) {
            throw new Error('Required parameter fileId was null or undefined when calling getFileByClaimnumberAndFileid.');
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

        return this.httpClient.request<GetClaimDocumentFileResponse>('get',`${this.basePath}/claims/${encodeURIComponent(String(claimNumber))}/documents/${encodeURIComponent(String(fileId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Upload files for specific claim
     * Upload files for specific claim
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public uploadFilesByClaimNumber(body?: DocumentsUploadBody, observe?: 'body', reportProgress?: boolean): Observable<UploadClaimDocumentsResponse>;
    public uploadFilesByClaimNumber(body?: DocumentsUploadBody, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<UploadClaimDocumentsResponse>>;
    public uploadFilesByClaimNumber(body?: DocumentsUploadBody, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<UploadClaimDocumentsResponse>>;
    public uploadFilesByClaimNumber(body?: DocumentsUploadBody, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<UploadClaimDocumentsResponse>('post',`${this.basePath}/claim/documents/upload`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
