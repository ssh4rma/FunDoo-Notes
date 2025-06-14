import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { IconsComponent } from '../notes/icons/icons.component';
import { ChangeColorService } from 'src/app/services/color-change/change-color.service';
import { DashboardDataService } from 'src/app/services/dashboard-data/dashboard-data.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReminderService } from 'src/app/services/reminder/reminder.service';

@Component({
  selector: 'app-reminder',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    IconsComponent,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css'],
})
export class ReminderComponent {
  constructor(
    private readonly colorService: ChangeColorService,
    private readonly dashboardService: DashboardDataService,
    private readonly dialog: MatDialog,
    private readonly reminderService: ReminderService
  ) {}

  fullNotes: any[] = [];
  notes: any[] = [];
  searchText = '';

  ngOnInit(): void {
    this.dashboardService.text$.subscribe((txt) => {
      this.searchText = txt.toLowerCase();
      this.filterNotes();
    });

    this.reminderService.reminderNotes$.subscribe((notes) => {
      this.fullNotes = notes.filter((n: any) => !n.isDeleted);
      this.filterNotes();
    });

    this.reminderService.getReminderNotes();
  }

  filterNotes(): void {
    if (!this.searchText.trim()) {
      this.notes = [...this.fullNotes];
    } else {
      this.notes = this.fullNotes.filter((note) =>
        note.title?.toLowerCase().includes(this.searchText)
      );
    }
  }

  bgHandler(color: string, note: any): void {
    const data = {
      color,
      noteIdList: [note.id],
    };

    this.colorService.postColorChange(data).subscribe({
      next: () => this.reminderService.getReminderNotes(),
      error: (err) => console.log(err),
    });
  }

  openEditDialog(note: any): void {
    this.dialog.open(EditNoteComponent, {
      data: note,
    });
  }
}
