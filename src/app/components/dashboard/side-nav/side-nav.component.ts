import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent {
  @Input() hoveredIndex: number | null = null;
  @Input() selectedIndex = 0;
  @Input() isSideNavOpen = false;

  @Output() setHoveredIndex = new EventEmitter<number | null>();
  @Output() setSelectedIndex = new EventEmitter<number>();
  @Output() onClickNotes = new EventEmitter<void>();
  @Output() onClickArchive = new EventEmitter<void>();
  @Output() onClickTrash = new EventEmitter<void>();
  @Output() onClickReminder = new EventEmitter<void>();

  isHovered = false;

  onEnter(): void {
    this.isHovered = true;
  }

  onLeave(): void {
    this.isHovered = false;
  }

  handleSelect(index: number, handler?: EventEmitter<void>): void {
    this.setSelectedIndex.emit(index);
    if (handler) {
      handler.emit();
    }
  }

  items = [
    { icon: 'lightbulb', label: 'Notes', index: 0, handler: this.onClickNotes },
    {
      icon: 'notifications',
      label: 'Reminders',
      index: 1,
      handler: this.onClickReminder,
    },
    { icon: 'edit', label: 'Edit Labels', index: 2 },
    {
      icon: 'archive',
      label: 'Archive',
      index: 3,
      handler: this.onClickArchive,
    },
    { icon: 'delete', label: 'Trash', index: 4, handler: this.onClickTrash },
  ];
}
