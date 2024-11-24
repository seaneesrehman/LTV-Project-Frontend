import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';

import { NumberListComponent } from './number-list.component';
import { NumberService } from '../../services/number.service';
import { PhoneNumber } from '../../models/number.model';

describe('NumberListComponent', () => {
  let component: NumberListComponent;
  let fixture: ComponentFixture<NumberListComponent>;
  let numberServiceMock: jasmine.SpyObj<NumberService>;

  beforeEach(async () => {
    // Create a mock service
    numberServiceMock = jasmine.createSpyObj('NumberService', ['fetchNumbers']);

    await TestBed.configureTestingModule({
      imports: [NumberListComponent], // Your standalone component
      providers: [
        provideHttpClient(), 
        { provide: NumberService, useValue: numberServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display numbers on initialization', () => {
    const mockNumbers: PhoneNumber[] = [
      { number: '1234567890', status: 'active', messages: 5 },
      { number: '0987654321', status: 'inactive', messages: 3 }
    ];

    numberServiceMock.fetchNumbers.and.returnValue(of(mockNumbers));

    fixture.detectChanges(); // Trigger ngOnInit

    expect(component.numbers).toEqual(mockNumbers);
    expect(component.filteredNumbers).toEqual(mockNumbers);
    expect(component.isLoading).toBeFalse();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2); // Two data rows
    expect(rows[0].nativeElement.textContent).toContain('1234567890');
    expect(rows[1].nativeElement.textContent).toContain('0987654321');
  });

  it('should filter numbers by status', () => {
    const mockNumbers: PhoneNumber[] = [
      { number: '1234567890', status: 'active', messages: 5 },
      { number: '0987654321', status: 'inactive', messages: 3 }
    ];

    numberServiceMock.fetchNumbers.and.returnValue(of(mockNumbers));

    fixture.detectChanges(); // Trigger ngOnInit

    // Simulate applying a filter
    component.applyFilter('active');
    fixture.detectChanges();

    expect(component.filteredNumbers.length).toBe(1);
    expect(component.filteredNumbers[0].status).toBe('active');
  });

  it('should toggle the status of a number', () => {
    const mockNumbers: PhoneNumber[] = [
      { number: '1234567890', status: 'active', messages: 5 },
      { number: '0987654321', status: 'inactive', messages: 3 }
    ];

    numberServiceMock.fetchNumbers.and.returnValue(of(mockNumbers));

    fixture.detectChanges(); // Trigger ngOnInit

    // Simulate toggling status
    const numberToToggle = component.numbers[0];
    component.toggleStatus(numberToToggle);
    fixture.detectChanges();

    expect(numberToToggle.status).toBe('inactive'); // Status toggled
  });

  it('should handle an empty list gracefully', () => {
    numberServiceMock.fetchNumbers.and.returnValue(of([]));

    fixture.detectChanges(); // Trigger ngOnInit

    expect(component.numbers.length).toBe(0);
    expect(component.filteredNumbers.length).toBe(0);

    const emptyStateMessage = fixture.debugElement.query(By.css('tbody tr td'));
    expect(emptyStateMessage.nativeElement.textContent).toContain('No phone numbers found for the selected filter.');
  });
});
