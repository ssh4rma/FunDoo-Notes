import { Injectable } from '@angular/core';
import { HttpserviceService } from '../httpservice/httpservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TrashService {
  constructor(private http: HttpserviceService) {}

  postTrashNote(data: any) {
    this.http.getHeader();
    let token = this.http.token;
    let url = `https://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes?access_token=${token}`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.postApi(url, data, headers);
  }

  getTrashNote() {
    this.http.getHeader();
    let token = this.http.token;
    let url = `https://fundoonotes.incubation.bridgelabz.com/api/notes/getTrashNotesList?access_token=${token}
`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.http.getApi(url, headers);
  }

  postDeleteForever(data: any) {
    this.http.getHeader();
    let token = this.http.token;
    let url = `https://fundoonotes.incubation.bridgelabz.com/api/notes/deleteForeverNotes?access_token=${token}`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.postApi(url, data, headers);
  }
}
