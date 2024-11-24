import { Component } from '@angular/core';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { FilterComponent } from '../filter/filter.component';
import { CommonModule } from '@angular/common';
import { NumberService } from '../../services/number.service';
import { PhoneNumber } from '../../models/number.model';

@Component({
  selector: 'app-number-list',
  standalone: true,
  templateUrl: './number-list.component.html',
  styleUrls: ['./number-list.component.css'],
  imports: [CommonModule, ActionButtonComponent, FilterComponent],  // Import the standalone components
})
export class NumberListComponent {
  numbers: PhoneNumber[] = [];
  filteredNumbers: PhoneNumber[] = [];
  paginatedNumbers: PhoneNumber[] = []; 
  isLoading = false;
  errorMessage = '';
  currentPage = 1; 
  itemsPerPage = 2; 
  totalPages = 0; 

  constructor(private numberService: NumberService) {}

  ngOnInit(): void {
    this.loadNumbers();
  }

  loadNumbers(): void {
    this.isLoading = true;
    this.numberService.fetchNumbers().subscribe({
      next: (data) => {
        this.numbers = data;
        this.filteredNumbers = data; // Initialize filtered numbers
        this.totalPages = Math.ceil(this.filteredNumbers.length / this.itemsPerPage);
        this.updatePaginatedNumbers();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      },
    });
  }

  toggleStatus(number: any) {
    number.status = number.status === 'active' ? 'inactive' : 'active';
  }

  applyFilter(status: string): void {
    if (status === 'all') {
      this.filteredNumbers = this.numbers;
    } else {
      this.filteredNumbers = this.numbers.filter((number) => number.status === status);
    }
    this.totalPages = Math.ceil(this.filteredNumbers.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedNumbers();
  }

  updatePaginatedNumbers(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedNumbers = this.filteredNumbers.slice(startIndex, endIndex);
  }

  // Navigate to a specific page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedNumbers();
    }
  }

  // Method to handle the 'Math.min' logic in the component
  getPaginationEnd(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredNumbers.length);
  }

  // Method to get the pagination start
  getPaginationStart(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }
}
