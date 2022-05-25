import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Agent } from '../_models';

@Injectable({ providedIn: 'root' })
export class AgentsService {
  constructor(private http: HttpClient) {}

  get(agentId: number): Observable<Agent> {
    return this.http.get<Agent>(`${environment.apiUrl}/agents/${agentId}`);
  }

  post(agent: Agent) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(agent);
    console.log(body);
    return this.http.post<Agent>(`${environment.apiUrl}/agents`, body, { headers: headers });
  }

  put(agent: Agent) {
    return this.http.post<any>(`${environment.apiUrl}/agents`, JSON.stringify(agent)).pipe(map((agent) => {}));
  }

  delete(agentId: number) {
    return this.http.delete<any>(`${environment.apiUrl}/agents/${agentId}`).pipe(map((agent) => {}));
  }

  getAll(object: any){};
}
