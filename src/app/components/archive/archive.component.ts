import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchiveService } from 'src/app/services/archive/archive.service';
import { MatCardModule } from '@angular/material/card';
import { IconsComponent } from '../notes/icons/icons.component';
import { NotesService } from 'src/app/services/notes/notes.service';
import { ChangeColorService } from 'src/app/services/color-change/change-color.service';
import { DashboardDataService } from 'src/app/services/dashboard-data/dashboard-data.service';
import { MatIconModule } from '@angular/material/icon';
import { PinedService } from 'src/app/services/pined/pined.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    IconsComponent,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css'],
})
export class ArchiveComponent {
  constructor(
    private archiveService: ArchiveService,
    private colorService: ChangeColorService,
    private notesService: NotesService,
    private dashboardService: DashboardDataService,
    private pinService: PinedService,
    private dialog: MatDialog
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
        this.notes = this.notes.filter((n: any) => !n.isDeleted && !n.isPined);
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
            this.notes = this.notes.filter(
              (n: any) => !n.isDeleted && !n.isPined
            );
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
        this.notes = this.notes.filter((n: any) => !n.isDeleted && !n.isPined);
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
        this.notes = this.notes.filter((n: any) => !n.isDeleted && !n.isPined);
      },
      error: (err) => console.log(err),
    });
  }

  //pin = true through postPin api and remove from archive
  pinHandler(note: any): void {
    // console.log('this will triggered when card on pinning the card');
    let data = {
      isPined: true,
      noteIdList: [note.id],
    };

    this.pinService.postPinedNote(data).subscribe({
      next: () => this.notesService.getNotes(),
      error: (err) => console.log(err),
    });
    this.refreshNotes();
  }

  openEditDialog(note: any): void {
    this.dialog.open(EditNoteComponent, {
      data: note,
    });
  }
}
