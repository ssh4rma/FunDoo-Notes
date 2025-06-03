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
    return this.http.get(this.baseURL + endpoint, { headers });
  }

  postApi(
    endpoint: string,
    header: HttpHeaders = new HttpHeaders(),
    body?: any
  ) {
    return this.http.post(this.baseURL + endpoint, { header }, body);
  }

  putApi(
    endpoint: string,
    headers: HttpHeaders = new HttpHeaders(),
    body?: any
  ) {
    return this.http.put(this.baseURL + endpoint, { headers }, body);
  }

  deleteApi(endpoint: string, headers: HttpHeaders = new HttpHeaders()) {
    return this.http.delete(this.baseURL + endpoint, { headers });
  }
}
