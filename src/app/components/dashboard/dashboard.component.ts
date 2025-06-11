import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { NotesComponent } from '../notes/notes.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TopNavComponent, SideNavComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private router: Router) {}

  isSideNavOpened = false;
  listView = true;

  hoveredIndex: number | null = null;
  selectedIndex = 0;

  toggleView(): void {
    this.listView = !this.listView;
  }

  toggleSidenav(): void {
    this.isSideNavOpened = !this.isSideNavOpened;
  }

  onClickNotes(): void {
    this.router.navigate(['/dashboard/notes']);
  }

  onClickArchive(): void {
    this.router.navigate(['/dashboard/archive']);
  }

  onClickTrash(): void {
    this.router.navigate(['/dashboard/trash']);
  }
}
