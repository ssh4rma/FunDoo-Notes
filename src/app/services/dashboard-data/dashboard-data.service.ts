import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardDataService {
  private viewSource = new BehaviorSubject<string>('listview');
  view$ = this.viewSource.asObservable();

  setView(view: string) {
    this.viewSource.next(view);
  }
}
