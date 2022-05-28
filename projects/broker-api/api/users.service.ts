/**
 * Axiom BROKER API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */ /* tslint:disable:no-unused-variable member-ordering */

import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Configuration } from '../configuration';
import { ChangePasswordRequest } from '../model/changePasswordRequest';
import { ChangePasswordResponse } from '../model/changePasswordResponse';
import { CheckEmailAvailableResponse } from '../model/checkEmailAvailableResponse';
import { ConfirmationRequest } from '../model/confirmationRequest';
import { ConfirmationResponse } from '../model/confirmationResponse';
import { CreateUserRequest } from '../model/createUserRequest';
import { CreateUserResponse } from '../model/createUserResponse';
import { EmailConfirmationResponse } from '../model/emailConfirmationResponse';
import { GetUserByIdResponse } from '../model/getUserByIdResponse';
import { GetUserResponse } from '../model/getUserResponse';
import { PasswordResetRequest } from '../model/passwordResetRequest';
import { PasswordResetResponse } from '../model/passwordResetResponse';
import { UpdateByAdminUserRequest } from '../model/updateByAdminUserRequest';
import { UpdateByAdminUserResponse } from '../model/updateByAdminUserResponse';
import { UpdateUserRequest } from '../model/updateUserRequest';
import { UpdateUserResponse } from '../model/updateUserResponse';

@Injectable()
export class UsersService {
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
   * Account email confirmation
   * Account email confirmation
   * @param email
   * @param token
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountEmailConfirmation(
    email: string,
    token: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<EmailConfirmationResponse>;
  public accountEmailConfirmation(
    email: string,
    token: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<EmailConfirmationResponse>>;
  public accountEmailConfirmation(
    email: string,
    token: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<EmailConfirmationResponse>>;
  public accountEmailConfirmation(
    email: string,
    token: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (email === null || email === undefined) {
      throw new Error('Required parameter email was null or undefined when calling accountEmailConfirmation.');
    }

    if (token === null || token === undefined) {
      throw new Error('Required parameter token was null or undefined when calling accountEmailConfirmation.');
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

    return this.httpClient.request<EmailConfirmationResponse>(
      'get',
      `${this.basePath}/email/${encodeURIComponent(String(email))}/token/${encodeURIComponent(String(token))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Account password change
   * Account password change
   * @param body
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountPasswordChange(
    body?: ChangePasswordRequest,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<ChangePasswordResponse>;
  public accountPasswordChange(
    body?: ChangePasswordRequest,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<ChangePasswordResponse>>;
  public accountPasswordChange(
    body?: ChangePasswordRequest,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<ChangePasswordResponse>>;
  public accountPasswordChange(
    body?: ChangePasswordRequest,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
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
    const consumes: string[] = ['application/json', 'text/json', 'application/_*+json'];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<ChangePasswordResponse>('post', `${this.basePath}/user/password/change`, {
      body: body,
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress
    });
  }

  /**
   * Account password reset
   * Account password reset
   * @param body
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountPasswordReset(
    body?: PasswordResetRequest,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<PasswordResetResponse>;
  public accountPasswordReset(
    body?: PasswordResetRequest,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<PasswordResetResponse>>;
  public accountPasswordReset(
    body?: PasswordResetRequest,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<PasswordResetResponse>>;
  public accountPasswordReset(
    body?: PasswordResetRequest,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
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
    const consumes: string[] = ['application/json', 'text/json', 'application/_*+json'];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<PasswordResetResponse>('post', `${this.basePath}/user/password/reset`, {
      body: body,
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress
    });
  }

  /**
   * Account password reset confirmation
   * Account password reset confirmation
   * @param body
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountPasswordResetConfirmation(
    body?: ConfirmationRequest,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<ConfirmationResponse>;
  public accountPasswordResetConfirmation(
    body?: ConfirmationRequest,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<ConfirmationResponse>>;
  public accountPasswordResetConfirmation(
    body?: ConfirmationRequest,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<ConfirmationResponse>>;
  public accountPasswordResetConfirmation(
    body?: ConfirmationRequest,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
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
    const consumes: string[] = ['application/json', 'text/json', 'application/_*+json'];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<ConfirmationResponse>('post', `${this.basePath}/user/password/reset/confirmation`, {
      body: body,
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress
    });
  }

  /**
   * Check whether email is available for registration
   * Check whether email is available for registration
   * @param email
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public userEmailCheckAvailable(
    email: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<CheckEmailAvailableResponse>;
  public userEmailCheckAvailable(
    email: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<CheckEmailAvailableResponse>>;
  public userEmailCheckAvailable(
    email: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<CheckEmailAvailableResponse>>;
  public userEmailCheckAvailable(
    email: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (email === null || email === undefined) {
      throw new Error('Required parameter email was null or undefined when calling userEmailCheckAvailable.');
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

    return this.httpClient.request<CheckEmailAvailableResponse>(
      'get',
      `${this.basePath}/user/check/email/${encodeURIComponent(String(email))}/available`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Get a user
   * Get a user
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public userGet(observe?: 'body', reportProgress?: boolean): Observable<GetUserResponse>;
  public userGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GetUserResponse>>;
  public userGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GetUserResponse>>;
  public userGet(observe: any = 'body', reportProgress: boolean = false): Observable<any> {
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

    return this.httpClient.request<GetUserResponse>('get', `${this.basePath}/user/get`, {
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress
    });
  }

  /**
   * Get a user by userid
   * Get a user by userid
   * @param userId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public userGetbyid(userId: string, observe?: 'body', reportProgress?: boolean): Observable<GetUserByIdResponse>;
  public userGetbyid(
    userId: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<GetUserByIdResponse>>;
  public userGetbyid(
    userId: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<GetUserByIdResponse>>;
  public userGetbyid(userId: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (userId === null || userId === undefined) {
      throw new Error('Required parameter userId was null or undefined when calling userGetbyid.');
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

    return this.httpClient.request<GetUserByIdResponse>(
      'get',
      `${this.basePath}/users/${encodeURIComponent(String(userId))}/get`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Create a user
   * Create a user
   * @param body
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public userRegistration(
    body?: CreateUserRequest,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<CreateUserResponse>;
  public userRegistration(
    body?: CreateUserRequest,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<CreateUserResponse>>;
  public userRegistration(
    body?: CreateUserRequest,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<CreateUserResponse>>;
  public userRegistration(
    body?: CreateUserRequest,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
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
    const consumes: string[] = ['application/json', 'text/json', 'application/_*+json'];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<CreateUserResponse>('post', `${this.basePath}/user/create`, {
      body: body,
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress
    });
  }

  /**
   * Update a user
   * Update a user
   * @param body
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public userUpdate(
    body?: UpdateUserRequest,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<UpdateUserResponse>;
  public userUpdate(
    body?: UpdateUserRequest,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<UpdateUserResponse>>;
  public userUpdate(
    body?: UpdateUserRequest,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<UpdateUserResponse>>;
  public userUpdate(body?: UpdateUserRequest, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
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
    const consumes: string[] = ['application/json', 'text/json', 'application/_*+json'];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<UpdateUserResponse>('put', `${this.basePath}/user/update`, {
      body: body,
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress
    });
  }

  /**
   * Update a user by admin
   * Update a user by admin
   * @param userId
   * @param body
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public userUpdateByAdmin(
    userId: string,
    body?: UpdateByAdminUserRequest,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<UpdateByAdminUserResponse>;
  public userUpdateByAdmin(
    userId: string,
    body?: UpdateByAdminUserRequest,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<UpdateByAdminUserResponse>>;
  public userUpdateByAdmin(
    userId: string,
    body?: UpdateByAdminUserRequest,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<UpdateByAdminUserResponse>>;
  public userUpdateByAdmin(
    userId: string,
    body?: UpdateByAdminUserRequest,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (userId === null || userId === undefined) {
      throw new Error('Required parameter userId was null or undefined when calling userUpdateByAdmin.');
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
    const consumes: string[] = ['application/json', 'text/json', 'application/_*+json'];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<UpdateByAdminUserResponse>(
      'put',
      `${this.basePath}/users/${encodeURIComponent(String(userId))}/update`,
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