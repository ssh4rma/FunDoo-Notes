import { Injectable } from '@angular/core';
import { HttpserviceService } from '../httpservice/httpservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ArchiveService {
  constructor(private http: HttpserviceService) {}

  postArchiveNote(data: any) {
    this.http.getHeader();
    let token = this.http.token;
    let url = `https://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes?access_token=${token}`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.postApi(url, data, headers);
  }

  getArchiveNote() {
    this.http.getHeader();
    let token = this.http.token;
    let url = `https://fundoonotes.incubation.bridgelabz.com/api/notes/getArchiveNotesList?access_token=${token}
`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.http.getApi(url, headers);
  }
}
