import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchiveService } from 'src/app/services/archive/archive.service';
import { MatCardModule } from '@angular/material/card';
import { IconsComponent } from '../notes/icons/icons.component';
import { NotesService } from 'src/app/services/notes/notes.service';
import { ChangeColorService } from 'src/app/services/color-change/change-color.service';
import { DashboardDataService } from 'src/app/services/dashboard-data/dashboard-data.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [CommonModule, MatCardModule, IconsComponent, MatIconModule],
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css'],
})
export class ArchiveComponent {
  constructor(
    private archiveService: ArchiveService,
    private colorService: ChangeColorService,
    private notesService: NotesService,
    private dashboardService: DashboardDataService
  ) {}

  notes: any;
  view = '';

  ngOnInit() {
    this.dashboardService.view$.subscribe((val) => {
      this.view = val;
      // console.log(this.view);
    });
    this.archiveService.getArchiveNote().subscribe({
      next: (res: any) => {
        this.notes = res.data.data.slice().reverse();
        this.notes = this.notes.filter((n: any) => !n.isDeleted);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  bgHandler(color: string, note: any) {
    let noteIdList = note.id;
    let data: any = {
      color: color,
      noteIdList: [noteIdList],
    };

    this.colorService.postColorChange(data).subscribe({
      next: () => {
        this.archiveService.getArchiveNote().subscribe({
          next: (res: any) => {
            this.notes = res.data.data.slice().reverse();
          },
          error: (err) => console.log(err),
        });
      },
      error: (err) => console.log(err),
    });
  }

  refreshNotes(): void {
    this.archiveService.getArchiveNote().subscribe({
      next: (res: any) => {
        this.notes = res.data.data.slice().reverse();
        this.notes = this.notes.filter((n: any) => !n.isDeleted);
      },
      error: (err) => console.log(err),
    });
  }

  refreshNotesAfterDelete(): void {
    console.log('del notes in archive is working');
    this.archiveService.getArchiveNote();
    this.archiveService.getArchiveNote().subscribe({
      next: (res: any) => {
        this.notes = res.data.data.slice().reverse();
        this.notes = this.notes.filter((n: any) => !n.isDeleted);
      },
      error: (err) => console.log(err),
    });
  }
}
