import { Component, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DashboardDataService } from 'src/app/services/dashboard-data/dashboard-data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TopNavComponent, SideNavComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(
    private router: Router,
    private dashboardData: DashboardDataService
  ) {}

  isTrashClicked = false;
  isArchivedClicked = false;
  isSideNavOpened = false;
  isNotesClicked = true;
  isReminderClicked = false;
  listView = false;

  // view = '';
  // changeView(): void {}

  hoveredIndex: number | null = null;
  selectedIndex = 0;

  toggleView(view: string): void {
    this.listView = !this.listView;
    // this.view = view;
    this.dashboardData.setView(view);
    // console.log(this.view);
    // console.log(this.dashboardData.view$);
  }

  toggleSidenav(): void {
    this.isSideNavOpened = !this.isSideNavOpened;
  }

  onClickNotes(): void {
    this.router.navigate(['/dashboard/notes']);
    this.isNotesClicked = true;
    this.isArchivedClicked = false;
    this.isTrashClicked = false;
    this.isReminderClicked = false;
  }

  onClickArchive(): void {
    this.router.navigate(['/dashboard/archive']);
    console.log('archive is clicked');
    this.isNotesClicked = false;
    this.isArchivedClicked = true;
    this.isTrashClicked = false;
    this.isReminderClicked = false;
  }

  onClickTrash(): void {
    this.router.navigate(['/dashboard/trash']);
    this.isNotesClicked = false;
    this.isArchivedClicked = false;
    this.isTrashClicked = true;
    this.isReminderClicked = false;
  }

  onClickReminder(): void {
    this.router.navigate(['/dashboard/reminder']);
    this.isNotesClicked = false;
    this.isArchivedClicked = false;
    this.isTrashClicked = false;
    this.isReminderClicked = true;
  }

  searchHandler(txt: string) {
    // console.log(txt);
    this.dashboardData.setText(txt);
  }
}
