import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesService } from 'src/app/services/notes/notes.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { IconsComponent } from '../icons/icons.component';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    IconsComponent,
  ],
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css'],
})
export class NoteCardComponent implements OnInit {
  notes$ = this.notesService.notes$;
  @Input() view: string = '';
  @ViewChild(IconsComponent) icon_child!: IconsComponent;

  //archived
  note: any = []; //took a particular note which is being clicked

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.notesService.getNotes();
  }
}
