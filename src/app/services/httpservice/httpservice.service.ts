import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpserviceService {
  baseURL = 'https://fundoonotes.incubation.bridgelabz.com/api/';
  constructor(private http: HttpClient) {}

  //getHeader
  getHeader() {
    const header = new HttpHeaders({
      Authorization: localStorage.getItem('token') || '',
    });
    return header;
  }

  //get api
  getApi(endpoint: string, headers: HttpHeaders = new HttpHeaders()) {
    return this.http.get(this.baseURL + endpoint, { headers });
  }

  //post api
  postApi(endpoint: string, header: HttpHeaders = new HttpHeaders()) {}
}
