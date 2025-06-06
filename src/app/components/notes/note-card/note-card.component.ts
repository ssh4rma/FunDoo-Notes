import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesService } from 'src/app/services/notes/notes.service';
import { Note } from 'src/app/models/note.model';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css'],
})
export class NoteCardComponent {
  //onInit() karke sari notes get karlo then save it in an array : any then using @for display it in card one by one and arrange them in flex (row) and column (grid button using @Output)

  notes: Note[] = [];
  constructor(private notesService: NotesService) {}
}
