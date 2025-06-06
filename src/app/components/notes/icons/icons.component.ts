import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatChipsModule,
    FormsModule,
    MatCardModule,
  ],
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css'],
})
export class IconsComponent {
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

  showPalette = false;
  currentBg = '';

  setBg(color: string): void {
    this.bgColor.emit(color);
  }

  closeBox(): void {
    this.closeBtn.emit(false);
  }
}
