import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrashService } from 'src/app/services/trash/trash.service';
import { MatCardModule } from '@angular/material/card';
import { IconsComponent } from '../notes/icons/icons.component';

@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [CommonModule, MatCardModule, IconsComponent],
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css'],
})
export class TrashComponent {
  constructor(private trashService: TrashService) {}

  notes: any;

  ngOnInit() {
    this.trashService.getTrashNote().subscribe({
      next: (res: any) => {
        this.notes = res.data.data.slice().reverse();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
