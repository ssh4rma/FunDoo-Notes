import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ArchiveService } from 'src/app/services/archive/archive.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatChipsModule,
    FormsModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css'],
})
export class IconsComponent {
  constructor(private archiveService: ArchiveService) {}

  @Output() closeBtn = new EventEmitter();
  @Output() bgColor = new EventEmitter();

  @Input() formatBtn = false;
  @Input() colorPalette = false;
  @Input() notification = false;
  @Input() collaborator = false;
  @Input() image = false;
  @Input() archive = false;
  @Input() threeDots = false;
  @Input() undo = false;
  @Input() redo = false;
  @Input() closeButton = false;
  @Input() disableBtn = false;

  @Input() note: any;

  colors: string[] = [
    '#ffffff',
    '#F28B82',
    '#FBBC04',
    '#FFF475',
    '#CCFF90',
    '#A7FFEB',
    '#CBF0F8',
    '#AECBFA',
    '#D7AEFB',
    '#FDCFE8',
    '#E6C9A8',
    '#E8EAED',
  ];

  showPalette = false;

  setBg(color: string): void {
    this.bgColor.emit(color);
  }

  closeBox(): void {
    this.closeBtn.emit(false);
  }

  onArchiveClick() {
    let noteIdList = this.note.id;
    let data: any = {
      noteIdList: [noteIdList],
      isArchived: true,
    };

    if (this.note) {
      this.archiveService.postArchiveNote(data).subscribe({
        next: (res: any) => {
          // console.log(res);
          // console.log('posted archive note successful');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
