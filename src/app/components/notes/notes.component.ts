import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IconsComponent } from './icons/icons.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, IconsComponent],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent {
  expandNote = false;

  expand(): void {
    this.expandNote = !this.expandNote;
  }
}
