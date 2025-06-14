import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardDataService {
  private readonly viewSource = new BehaviorSubject<string>('listview');
  view$ = this.viewSource.asObservable();

  private readonly searchText = new BehaviorSubject<string>('');
  text$ = this.searchText.asObservable();

  setView(view: string) {
    this.viewSource.next(view);
  }

  setText(txt: string) {
    // console.log(txt);
    this.searchText.next(txt);
  }
}
