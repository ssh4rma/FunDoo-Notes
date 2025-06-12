import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrashService } from 'src/app/services/trash/trash.service';
import { MatCardModule } from '@angular/material/card';
import { IconsComponent } from '../notes/icons/icons.component';
import { MatIconModule } from '@angular/material/icon';
import { DashboardDataService } from 'src/app/services/dashboard-data/dashboard-data.service';

@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [CommonModule, MatCardModule, IconsComponent, MatIconModule],
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css'],
})
export class TrashComponent {
  constructor(
    private trashService: TrashService,
    private dashboardService: DashboardDataService
  ) {}

  notes: any;
  view = '';

  ngOnInit() {
    this.dashboardService.view$.subscribe((val) => {
      this.view = val;
      // console.log(this.view);
    });
    this.trashService.getTrashNote().subscribe({
      next: (res: any) => {
        this.notes = res.data.data.slice().reverse();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //getTrashNotes and filter notes with !n.isDel
  handleRecover(): void {
    // console.log('recover handler is working');
    this.trashService.getTrashNote().subscribe({
      next: (res: any) => {
        this.notes = res.data.data.slice().reverse();
        this.notes = this.notes.filter((n: any) => n.isDeleted);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleDelForever(): void {
    // console.log('del forever handler is working');
    this.trashService.getTrashNote().subscribe({
      next: (res: any) => {
        this.notes = res.data.data.slice().reverse();
        this.notes = this.notes.filter((n: any) => n.isDeleted);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
