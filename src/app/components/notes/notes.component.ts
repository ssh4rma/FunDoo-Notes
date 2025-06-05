import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from 'src/app/models/note.model';
import { NoteComponent } from './note/note.component';
import { NoteCardComponent } from './note-card/note-card.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, NoteComponent, NoteCardComponent],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent {}
