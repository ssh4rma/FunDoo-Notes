import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesService } from 'src/app/services/notes/notes.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { IconsComponent } from '../icons/icons.component';
import { DashboardDataService } from 'src/app/services/dashboard-data/dashboard-data.service';
import { ChangeColorService } from 'src/app/services/color-change/change-color.service';
import { MatIconModule } from '@angular/material/icon';
import { PinedService } from 'src/app/services/pined/pined.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    IconsComponent,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css'],
})
export class NoteCardComponent implements OnInit {
  constructor(
    private notesService: NotesService,
    private dashboardService: DashboardDataService,
    private colorService: ChangeColorService,
    private pinService: PinedService,
    private dialog: MatDialog
  ) {}

  notes$ = this.notesService.notes$;
  @ViewChild(IconsComponent) icon_child!: IconsComponent;

  view = '';
  pinView = false;
  paletteInGrid = false;
  isCardClicked = false;

  //archived
  note: any = []; //took a particular note which is being clicked

  pinnedNotes: any[] = [];
  unpinnedNotes: any[] = [];

  ngOnInit(): void {
    this.notesService.getNotes();
    this.dashboardService.view$.subscribe((val) => {
      this.view = val;
      // console.log(this.view);
    });

    this.notes$.subscribe((notes) => {
      this.pinnedNotes = notes
        .filter((n) => n.isPined && !n.isArchived && !n.isDeleted)
        .reverse();
      this.unpinnedNotes = notes
        .filter((n) => !n.isPined && !n.isArchived && !n.isDeleted)
        .reverse();
    });
  }

  bgHandler(color: string, note: any) {
    console.log('happening');
    console.log(note.id);
    let noteIdList = note.id;
    let data: any = {
      color: color,
      noteIdList: [noteIdList],
    };

    this.colorService.postColorChange(data).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.notesService.getNotes();
  }

  pinHandler(note: any): void {
    let data = {
      isPined: true,
      noteIdList: [note.id],
    };

    this.pinService.postPinedNote(data).subscribe({
      next: () => this.notesService.getNotes(),
      error: (err) => console.log(err),
    });
  }

  unpinHandler(note: any): void {
    let data = {
      isPined: false,
      noteIdList: [note.id],
    };

    this.pinService.postPinedNote(data).subscribe({
      next: () => this.notesService.getNotes(),
      error: (err) => console.log(err),
    });
  }

  deleteHandler(): void {
    console.log('delete handler is working');
    this.notesService.getNotes();
  }

  // openEditDialog(): void {
  // this.dialog.open(EditNoteComponent, {
  //   width: '400px',
  //   data: { /* pass note data here if needed */ }
  // });

  // cardClickHandler(): void {
  //   this.isCardClicked = true;
  // }
}
