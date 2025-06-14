import { Injectable } from '@angular/core';
import { HttpserviceService } from '../httpservice/httpservice.service';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Note } from 'src/app/models/note.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private notesSubject = new BehaviorSubject<Note[]>([]);
  notes$ = this.notesSubject.asObservable();

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
    this.http.getHeader();
    let token = this.http.token;

    let URL = `https://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList?access_token=${token}`;

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.http.getApi(URL, { headers }).subscribe({
      next: (res: any) => {
        this.notesSubject.next(res.data.data as Note[]);
      },
      error: (err) => console.log(err),
    });
  }

  updateNotes(data: any) {
    this.http.getHeader();
    let token = this.http.token;
    let URL = `https://fundoonotes.incubation.bridgelabz.com/api/notes/updateNotes?access_token=${token}`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.postApi(URL, data, { headers });
  }
}
