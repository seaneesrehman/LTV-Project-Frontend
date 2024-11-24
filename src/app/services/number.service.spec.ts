import { TestBed } from '@angular/core/testing';

import { NumberService } from './number.service';
import { provideHttpClient } from '@angular/common/http';

describe('NumberService', () => {
  let service: NumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(), // Register the HttpClient provider
        NumberService,
      ],
    });
    service = TestBed.inject(NumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
