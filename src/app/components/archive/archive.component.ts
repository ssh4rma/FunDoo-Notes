import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchiveService } from 'src/app/services/archive/archive.service';
import { MatCardModule } from '@angular/material/card';
import { IconsComponent } from '../notes/icons/icons.component';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [CommonModule, MatCardModule, IconsComponent],
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css'],
})
export class ArchiveComponent {
  constructor(private archiveService: ArchiveService) {}

  notes: any;

  ngOnInit() {
    this.archiveService.getArchiveNote().subscribe({
      next: (res: any) => {
        this.notes = res.data.data.slice().reverse();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
