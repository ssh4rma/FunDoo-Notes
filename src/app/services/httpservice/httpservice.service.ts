import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpserviceService {
  constructor(private http: HttpClient) {}
  token = '';

  getHeader() {
    this.token = localStorage.getItem('token') || '';
  }

  getApi(url: string, header: any = {}) {
    return this.http.get(url, header);
  }

  postApi(url: string, body: any, header: any = {}) {
    return this.http.post(url, body, header);
  }
}
