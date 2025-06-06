import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpserviceService {
  constructor(private http: HttpClient) {}

  token = '';

  getHeader(): void {
    this.token = localStorage.getItem('token') || '';
  }

  getApi(url: string, options: any = {}): Observable<any> {
    return this.http.get(url, options);
  }

  postApi(url: string, body: any, options: any = {}): Observable<any> {
    return this.http.post(url, body, options);
  }
}
