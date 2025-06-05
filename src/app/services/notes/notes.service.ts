import { Injectable } from '@angular/core';
import { HttpserviceService } from '../httpservice/httpservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private http: HttpserviceService) {}

  postNote(data: any) {
    this.http.getHeader();
    let token = this.http.token;
    let URL = `https://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes?access_token=${token}`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.postApi(URL, data, { headers });
  }

  getNotes() {
    return this.http.getApi('/notes/getNotesList', this.http.getHeader());
  }
}
