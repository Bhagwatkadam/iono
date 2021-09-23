import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  private _sessionUserSubject: Subject<Object> = new BehaviorSubject(null);
  constructor(private httpClient: HttpClient) { }
  getService(endPoint: string) {
    return this.httpClient
      .get(`${environment.apiUrl}${endPoint}`)
      .pipe(map((res: Response) => res));
  }
  postService(endPoint: string, data) {
    return this.httpClient
      .post(`${environment.apiUrl}${endPoint}`, data, { 'headers': headers })
      .pipe(map((res: Response) => res));
  }
  sessionUserEvent(): Observable<any> {
    return this._sessionUserSubject.asObservable();
  }
  sessionUserEmit(sessionUser: any) {
    console.log(sessionUser);
    this._sessionUserSubject.next(sessionUser);
  }

  patchService(endPoint: string, data) {
    return this.httpClient
      .patch(`${environment.apiUrl}${endPoint}`, data)
      .pipe(map((res: Response) => res));
  }
  putService(endPoint: string, data) {
    return this.httpClient
      .put(`${environment.apiUrl}${endPoint}`, data)
      .pipe(map((res: Response) => res));
  }

  deleteService(endPoint: string) {
    return this.httpClient
      .delete(`${environment.apiUrl}${endPoint}`)
      .pipe(map((res: Response) => res));
  }

  tempCartridgeGetService(endPoint: string) {
    return this.httpClient
      .get(`${environment.cartridge_url}${endPoint}`)
      .pipe(map((res: Response) => res));
  }
  tempCartridgePostService(endPoint: string, data) {
    return this.httpClient
      .post(`${environment.cartridge_url}${endPoint}`, data, { 'headers': headers })
      .pipe(map((res: Response) => res));
  }

  tempCartridgeDeleteService(endPoint: string) {
    return this.httpClient
      .delete(`${environment.cartridge_url}${endPoint}`)
      .pipe(map((res: Response) => res));
  }

  userPostService(endPoint: string, data) {
    return this.httpClient
      .post(`${environment.user_url}${endPoint}`, data, { 'headers': headers })
      .pipe(map((res: Response) => res));
  }

  userGetService(endPoint: string) {
    return this.httpClient
      .get(`${environment.user_url}${endPoint}`)
      .pipe(map((res: Response) => res));
  }

  userUpdateService(endPoint: string, data) {
    return this.httpClient
      .put(`${environment.user_url}${endPoint}`, data)
      .pipe(map((res: Response) => res));
  }
  userDeleteService(endPoint: string) {
    return this.httpClient
      .delete(`${environment.user_url}${endPoint}`)
      .pipe(map((res: Response) => res));
  }
}
