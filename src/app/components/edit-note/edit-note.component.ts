import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { IconsComponent } from '../notes/icons/icons.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ChangeColorService } from 'src/app/services/color-change/change-color.service';
import { NotesService } from 'src/app/services/notes/notes.service';
import { MatDialogRef } from '@angular/material/dialog';
import { PinedService } from 'src/app/services/pined/pined.service';
import { ArchiveService } from 'src/app/services/archive/archive.service';

@Component({
  selector: 'app-edit-note',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    IconsComponent,
    FormsModule,
    MatIconModule,
    TextFieldModule,
  ],
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css'],
})
export class EditNoteComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private colorService: ChangeColorService,
    private notesService: NotesService,
    private dialogRef: MatDialogRef<EditNoteComponent>,
    private pinService: PinedService,
    private archiveService: ArchiveService
  ) {}

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => {
      this.refreshData();
    });
  }

  dateString = this.data.modifiedDate;
  date = new Date(this.dateString);

  timeWithAmPm = this.date.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  bgColor = this.data.color;
  pinView = this.data.isPined;

  togglePin(): void {
    this.pinView = !this.pinView;
  }
  dataFromCloseBtn(data: any): void {}
  isArchivedClickHandler(data: any): void {}

  //color api
  setBgColor(color: string, note: any) {
    let noteIdList = note.id;
    let data: any = {
      color: color,
      noteIdList: [noteIdList],
    };

    console.log('this is api for calling color change in edit card');
    this.colorService.postColorChange(data).subscribe({
      next: (res: any) => {
        this.bgColor = color;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.notesService.getNotes();
  }

  //unarchive
  unarchiveHandler(): void {
    this.refreshData();
  }

  //delete
  isDel(): void {
    this.refreshData();
  }

  //pin
  pinHandler(): void {
    // console.log('pinned handler');
    let pinData: any = {
      noteIdList: [this.data.id],
      isPined: false,
    };
    this.pinService.postPinedNote(pinData).subscribe({
      next: () => {
        this.dialogRef.close();
        this.notesService.getNotes();
      },
      error: (err) => console.log(err),
    });
  }

  unPinHandler(): void {
    let pinData: any = {
      noteIdList: [this.data.id],
      isPined: true,
    };
    this.pinService.postPinedNote(pinData).subscribe({
      next: () => {
        this.dialogRef.close();
        this.notesService.getNotes();
      },
      error: (err) => console.log(err),
    });
  }

  onCloseBtn(): void {
    this.refreshData();
  }

  refreshData(): void {
    let newData = {
      noteId: this.data.id,
      title: this.data.title,
      description: this.data.description,
      color: this.bgColor,
    };

    this.notesService.updateNotes(newData).subscribe({
      next: () => {
        this.dialogRef.close();
        this.notesService.getNotes();
        this.archiveService.getArchiveNote();
      },
      error: (err) => console.log(err),
    });
  }
}
