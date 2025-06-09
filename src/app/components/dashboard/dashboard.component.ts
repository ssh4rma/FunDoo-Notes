import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NotesComponent } from '../notes/notes.component';

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
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  showMenu = false;
  isSideNavOpened = false;
  opened = true;
  listView = true;

  hoveredIndex: number | null = null;
  selectedIndex: number = 0;

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  toggleView(): void {
    this.listView = !this.listView;
  }
}
