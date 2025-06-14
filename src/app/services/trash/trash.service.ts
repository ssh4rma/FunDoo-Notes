import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { HttpserviceService } from '../httpservice/httpservice.service';

@Injectable({
  providedIn: 'root',
})
export class TrashService {
  private readonly trashNotesSubject = new BehaviorSubject<any[]>([]);
  trashNotes$ = this.trashNotesSubject.asObservable();

  constructor(private readonly http: HttpserviceService) {}

  getTrashNote(): void {
    this.http.getHeader();
    const token = this.http.token;
    const url = `https://fundoonotes.incubation.bridgelabz.com/api/notes/getTrashNotesList?access_token=${token}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    this.http.getApi(url, headers).subscribe({
      next: (res: any) => {
        const updateNotes = res.data.data.reverse();
        this.trashNotesSubject.next(updateNotes);
      },
      error: (err) => {
        console.error('Error fetching trash notes:', err);
      },
    });
  }

  postTrashNote(data: any) {
    this.http.getHeader();
    const token = this.http.token;
    const url = `https://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes?access_token=${token}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.postApi(url, data, headers);
  }

  postDeleteForever(data: any) {
    this.http.getHeader();
    const token = this.http.token;
    const url = `https://fundoonotes.incubation.bridgelabz.com/api/notes/deleteForeverNotes?access_token=${token}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.postApi(url, data, headers);
  }
}
