import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Region } from '../_models';

@Injectable({ providedIn: 'root' })
export class RegionsService {
  constructor(private http: HttpClient) {}

  get(): Observable<Region> {
    return this.http.get<Region>(`${environment.apiUrl}/regions`);
  }

  getAllByAgent(agentId: number): Observable<Region> {
    return this.http.get<Region>(`${environment.apiUrl}/agents/${agentId}/regions`);
  }

  getByAgentAndRegion(agentId: number, regionId: number): Observable<Region> {
    return this.http.get<Region>(`${environment.apiUrl}/agents/${agentId}/regions/${regionId}`);
  }

  post(region: Region) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(region);
    console.log(body);
    return this.http.post<Region>(`${environment.apiUrl}/regions`, body, { headers: headers });
  }

  put(region: Region) {
    return this.http.post<any>(`${environment.apiUrl}/regions`, JSON.stringify(region)).pipe(map((agent) => {}));
  }

  delete(regionId: number) {
    return this.http.delete<any>(`${environment.apiUrl}/regions/${regionId}`).pipe(map((agent) => {}));
  }
}
