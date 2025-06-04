import { Injectable } from '@angular/core';
import { HttpserviceService } from '../httpservice/httpservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpserviceService) {}

  //user can login and signup
  login(data: any) {
    let endpoint = '/user/login';
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.postApi(endpoint, data, header);
  }

  signup(data: any) {
    let endPoint: string = '/user/userSignUp';
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.postApi(endPoint, data, header);
  }
}
