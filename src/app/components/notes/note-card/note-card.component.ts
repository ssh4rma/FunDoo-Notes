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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditNoteComponent } from '../../edit-note/edit-note.component';
import { ReminderComponent } from '../../reminder/reminder.component';
import { ReminderService } from 'src/app/services/reminder/reminder.service';

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
export class NoteCardComponent {
  constructor(
    private readonly notesService: NotesService,
    private readonly dashboardService: DashboardDataService,
    private readonly colorService: ChangeColorService,
    private readonly pinService: PinedService,
    private readonly dialog: MatDialog,
    private readonly reminderService: ReminderService
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

  searchText = '';

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

    this.dashboardService.text$.subscribe((txt) => {
      this.searchText = txt.toLowerCase();
      if (this.searchText.length === 0) {
        this.notes$.subscribe((notes) => {
          this.pinnedNotes = notes
            .filter((n) => n.isPined && !n.isArchived && !n.isDeleted)
            .reverse();
          this.unpinnedNotes = notes
            .filter((n) => !n.isPined && !n.isArchived && !n.isDeleted)
            .reverse();
        });
      }
      this.noteFilter();
    });
  }

  private getTimeAndDate(day: 'am' | 'pm'): string {
    const now = new Date();
    const reminderDate = new Date();

    if (day === 'am') {
      reminderDate.setDate(now.getDate() + 1);
      reminderDate.setHours(8, 0, 0, 0);
    } else if (day === 'pm') {
      reminderDate.setHours(20, 0, 0, 0);
    }

    return reminderDate.toISOString();
  }

  setReminder(day: 'am' | 'pm', note: any): void {
    const date = this.getTimeAndDate(day);
    const data = {
      reminder: [date],
      noteIdList: [note.id],
    };

    this.reminderService.postReminderNotes(data).subscribe({
      next: () => {
        console.log('Reminder set for:', date);
      },
      error: (err) => console.log(err),
    });
  }

  noteFilter(): void {
    this.notes$.subscribe((notes) => {
      const filtered = notes.filter((n) =>
        n.title.toLowerCase().includes(this.searchText)
      );

      this.pinnedNotes = filtered
        .filter((n) => n.isPined && !n.isArchived && !n.isDeleted)
        .reverse();

      this.unpinnedNotes = filtered
        .filter((n) => !n.isPined && !n.isArchived && !n.isDeleted)
        .reverse();
    });
  }

  bgHandler(color: string, note: any) {
    // console.log('happening');
    // console.log(note.id);
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

  archiveHandler(): void {
    // console.log('this will trigger after clicking the archive');
    this.notesService.getNotes();

    this.notes$.subscribe((notes) => {
      this.pinnedNotes = notes
        .filter((n) => n.isPined && !n.isArchived && !n.isDeleted)
        .reverse();
      this.unpinnedNotes = notes
        .filter((n) => !n.isPined && !n.isArchived && !n.isDeleted)
        .reverse();
    });
  }

  openEditDialog(note: any) {
    this.dialog.open(EditNoteComponent, {
      data: note,
    });
  }
}
