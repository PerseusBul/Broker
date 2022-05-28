import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class AppInitService {
  private readonly configPath: string = '/assets/config.json';

  constructor(
    private http: HttpClient
  ) { }

  public async init() {
    try {
      const response = await
        this.http
          .get(`${this.configPath}`)
          .pipe(shareReplay(1))
          .toPromise();
      window.config = response;
      return response;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export function initConfig(appLoadService: AppInitService) {
  return () => appLoadService.init();
}
