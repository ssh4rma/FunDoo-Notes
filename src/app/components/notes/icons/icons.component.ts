import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ArchiveService } from 'src/app/services/archive/archive.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NotesService } from 'src/app/services/notes/notes.service';
import { TrashService } from 'src/app/services/trash/trash.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatChipsModule,
    FormsModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css'],
})
export class IconsComponent {
  constructor(
    private archiveService: ArchiveService,
    private notesService: NotesService,
    private trashService: TrashService,
    private _snackBar: MatSnackBar
  ) {}

  @Output() closeBtn = new EventEmitter();
  @Output() bgColor = new EventEmitter();
  @Output() isArchivedClickHandler = new EventEmitter<boolean>();
  @Output() unarchiveEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  @Output() delForeverEvent = new EventEmitter();
  @Output() recoverEvent = new EventEmitter();
  @Output() editCloseBtn = new EventEmitter();
  @Output() reminderTime = new EventEmitter();

  @Input() formatBtn = false;
  @Input() colorPalette = false;
  @Input() notification = false;
  @Input() collaborator = false;
  @Input() image = false;
  @Input() archive = false;
  @Input() threeDots = false;
  @Input() undo = false;
  @Input() redo = false;
  @Input() closeButton = false;
  @Input() disableBtn = false;
  @Input() recoverBtn = false;
  @Input() delForeverBtn = false;
  @Input() menuBtn = false;
  @Input() unarchive = false;

  @Input() paletteInGrid = false;

  @Input() note: any;

  colors: string[] = [
    '#ffffff',
    '#F28B82',
    '#FBBC04',
    '#FFF475',
    '#CCFF90',
    '#A7FFEB',
    '#CBF0F8',
    '#AECBFA',
    '#D7AEFB',
    '#FDCFE8',
    '#E6C9A8',
    '#E8EAED',
  ];

  showPalette = false;

  paletteHandleClick(): void {
    this.showPalette = !this.showPalette;
  }

  setBg(color: string): void {
    this.bgColor.emit(color);
  }

  setReminder(time: string): void {
    this.reminderTime.emit(time);
  }

  closeBox(): void {
    this.closeBtn.emit(false);
  }

  onArchiveClick() {
    let noteIdList = this.note.id;
    let data: any = {
      noteIdList: [noteIdList],
      isArchived: true,
    };
    if (this.note) {
      this.archiveService.postArchiveNote(data).subscribe({
        next: () => {
          this.isArchivedClickHandler.emit(true);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  onUnarchiveClick(): void {
    let noteIdList = this.note.id;
    let data: any = {
      noteIdList: [noteIdList],
      isArchived: false,
    };

    if (this.note) {
      this.archiveService.postArchiveNote(data).subscribe({
        next: () => {
          this.unarchiveEvent.emit();
          // this.archiveService.getArchiveNote().subscribe();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  deleteHandler(): void {
    // console.log('delete pressed');
    let noteIdList = this.note.id;
    let data: any = {
      noteIdList: [noteIdList],
      isDeleted: true,
    };

    if (this.note) {
      this.trashService.postTrashNote(data).subscribe({
        next: () => {
          this.deleteEvent.emit();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  deleteForeverClick(): void {
    let noteIdList = this.note.id;
    let data: any = {
      noteIdList: [noteIdList],
    };

    this.trashService.postDeleteForever(data).subscribe({
      next: () => {
        this.delForeverEvent.emit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //post api with isDelete false
  restoreClick(): void {
    let noteIdList = this.note.id;
    let data: any = {
      noteIdList: [noteIdList],
      isDeleted: false,
    };

    this.trashService.postTrashNote(data).subscribe({
      next: () => {
        this.recoverEvent.emit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onClickEditCloseBtn(): void {
    this.editCloseBtn.emit();
  }

  //change color
}
