import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NotesComponent } from '../notes/notes.component';
import { NoteComponent } from '../notes/note/note.component';
import { IconsComponent } from '../notes/icons/icons.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    NotesComponent,
    NoteComponent,
    IconsComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  showFiller = false;
  showMenu = false;
  isSideNavOpened = false;

  selectedIndex: number = 0;
  hoveredIndex: number | null = null;

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  sideNavItems = [
    { icon: 'lightbulb', label: 'Notes' },
    { icon: 'notifications', label: 'Reminders' },
    { icon: 'edit', label: 'Add Label' },
    { icon: 'archive', label: 'Archive' },
    { icon: 'delete', label: 'Trash' },
  ];
}
