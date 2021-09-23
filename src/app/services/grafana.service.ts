import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrafanaService {

  constructor(private httpClient: HttpClient) {
  }

  headers = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('X-Grafana-Org-Id', '2')
    .set('Authorization', 'Bearer eyJrIjoiZUVCeks1TUpUdk02U3pzb0JwQnFiYmR5MjR1Rmd4RmIiLCJuIjoiYWRtaW5fMSIsImlkIjoxfQ==')
    // .set('Access-Control-Allow-Origin', '*');
  postGafana(): Observable<any> {
    return this.httpClient.get<any>('/api/dashboards/home'​)
  }
}
