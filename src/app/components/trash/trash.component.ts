import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrashService } from 'src/app/services/trash/trash.service';
import { MatCardModule } from '@angular/material/card';
import { IconsComponent } from '../notes/icons/icons.component';
import { MatIconModule } from '@angular/material/icon';
import { DashboardDataService } from 'src/app/services/dashboard-data/dashboard-data.service';

@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [CommonModule, MatCardModule, IconsComponent, MatIconModule],
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css'],
})
export class TrashComponent {
  constructor(
    private readonly trashService: TrashService,
    private readonly dashboardService: DashboardDataService
  ) {}

  notes: any[] = [];
  view = '';
  searchText = '';

  ngOnInit(): void {
    this.dashboardService.view$.subscribe((val) => {
      this.view = val;
    });

    this.trashService.trashNotes$.subscribe((notes: any[]) => {
      this.notes = notes.filter((note) => note.isDeleted);
    });

    this.trashService.getTrashNote();

    this.dashboardService.text$.subscribe((txt) => {
      this.searchText = txt.toLowerCase();
      if (this.searchText.length === 0) {
        this.trashService.trashNotes$.subscribe((notes: any[]) => {
          this.notes = notes.filter((note) => note.isDeleted);
        });
      }
      this.notesFilter();
    });
  }

  notesFilter(): void {
    this.trashService.trashNotes$.subscribe(() => {
      this.notes = this.notes.filter((n) =>
        n.title.toLowerCase().includes(this.searchText)
      );
    });
  }

  handleRecover(): void {
    this.trashService.getTrashNote();
  }

  handleDelForever(): void {
    this.trashService.getTrashNote();
  }

  emptyTrashHandler(): void {
    this.trashService.trashNotes$.subscribe({
      next: (notes) => {
        const deletedNotes = notes.filter((note) => note.isDeleted);
        for (const note of deletedNotes) {
          const data = { noteIdList: [note.id] };
          this.trashService.postDeleteForever(data).subscribe({
            next: () => this.trashService.getTrashNote(),
            error: (err) => console.log(err),
          });
        }
      },
      error: (err) => console.log(err),
    });
  }
}
