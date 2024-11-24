import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  standalone: true,
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  @Output() statusFilter = new EventEmitter<string>();

  
  filterStatus(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; 
    this.statusFilter.emit(selectElement.value); 
  }

}
