import { Injectable } from '@angular/core';
import { HttpserviceService } from '../httpservice/httpservice.service';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArchiveService {
  constructor(private readonly http: HttpserviceService) {}

  private readonly archiveNotesSubject = new BehaviorSubject<any[]>([]);
  archiveNotes$ = this.archiveNotesSubject.asObservable();

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

    this.http.getApi(url, headers).subscribe({
      next: (res: any) => {
        const updateNotes = res.data.data.reverse();
        this.archiveNotesSubject.next(updateNotes);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
