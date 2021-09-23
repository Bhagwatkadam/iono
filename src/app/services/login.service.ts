import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/config/app.config';
import { environment } from 'src/environments/environment';
import { CommonServiceService } from './common-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  grafanaUrl: string = ""// environment.grafana;
  constructor(
    private commonService: CommonServiceService,
    private httpClient: HttpClient,
    private appConfig: AppConfig
  ) { }

  headers = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('X-Grafana-Org-Id', '2')
    .set('Cookie', 'grafana_session=89c9cc92c3121ad223fe29f16ee4d20b')
  postGafana(): Observable<any> {
    return this.httpClient.get<any>('/api/dashboards/home')
  }

  login(data: any) {
    console.log(this.appConfig.title);
    //return this.commonService.userPostService('v1/users/login', data)
    const loginData = { "user": data.user_id, "password": data.password }
    return this.httpClient.post(this.grafanaUrl + '/login', loginData)
  }

  getUser() {
    return this.httpClient.get(this.grafanaUrl + '/api/user');
  }

  getAuthKey(data: any) {
    return this.httpClient.post(this.grafanaUrl + '/api/auth/keys', data);
  }

  logout() {
    sessionStorage.clear();
  }

  loginSignup(data: any) {
    return this.httpClient.post(this.grafanaUrl + '/login', data)
  }
}