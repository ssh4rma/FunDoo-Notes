import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpserviceService {
  baseURL = 'https://fundoonotes.incubation.bridgelabz.com/api';
  constructor(private http: HttpClient) {}

  getHeader() {
    const header = new HttpHeaders({
      Authorization: localStorage.getItem('token') || '',
    });
    return header;
  }

  getApi(endpoint: string, headers: HttpHeaders = new HttpHeaders()) {
    let url = this.baseURL + endpoint;
    return this.http.get(url, { headers });
  }

  postApi(endPoint: string, body: any, headers: HttpHeaders) {
    let combinedUrl = this.baseURL + endPoint;

    return this.http.post(combinedUrl, (body = JSON.stringify(body)), {
      headers,
    });
  }
}
