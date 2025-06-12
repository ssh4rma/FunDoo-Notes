import { Injectable } from '@angular/core';
import { HttpserviceService } from '../httpservice/httpservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PinedService {
  constructor(private http: HttpserviceService) {}

  postPinedNote(data: any) {
    this.http.getHeader();
    let token = this.http.token;
    let url = `https://fundoonotes.incubation.bridgelabz.com/api/notes/pinUnpinNotes?access_token=${token}`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.postApi(url, data, headers);
  }
}
