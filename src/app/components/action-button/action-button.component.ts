import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-button',
  standalone: true,
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.css'],
  imports:[
    CommonModule
  ]
})
export class ActionButtonComponent {
  @Input() status: string = 'inactive';
  @Output() toggleStatus = new EventEmitter<void>();

  onToggleStatus() {
    this.toggleStatus.emit();
  }
}
