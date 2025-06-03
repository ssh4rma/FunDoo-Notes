import { Injectable } from '@angular/core';
import { HttpserviceService } from '../httpservice/httpservice.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpserviceService) {}

  //user can login and signup
  login(payload: any) {
    return this.http.postApi('/user/login', payload);
  }

  signup(payload: any) {
    return this.http.postApi('/user/userSignUp', payload);
  }
}
