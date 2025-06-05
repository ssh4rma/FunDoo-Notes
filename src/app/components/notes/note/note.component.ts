import { Component, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IconsComponent } from '../icons/icons.component';
import { FormsModule } from '@angular/forms';
import { Note } from '../../../models/note.model';
import { NotesService } from 'src/app/services/notes/notes.service';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    IconsComponent,
    FormsModule,
  ],
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent {
  constructor(private eRef: ElementRef, private notesService: NotesService) {}
  expandNote = false;

  // now take data from the user
  title = '';
  description = '';

  //the component will collapse when there's click outside of the component
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      if (this.title.trim() || this.description.trim()) {
        const newNote: Note = {
          title: this.title,
          description: this.description,
          isArchived: false,
          isPined: false,
        };

        this.notesService.postNote(newNote).subscribe({
          next: (res: any) => {
            console.log(res);
          },
          error: (err) => {
            console.error(err);
          },
        });

        this.title = '';
        this.description = '';
      }

      this.expandNote = false;
    }
  }

  expand(): void {
    this.expandNote = !this.expandNote;
  }

  dataFromCloseBtn(event: boolean): void {
    this.expandNote = event;
  }
}
