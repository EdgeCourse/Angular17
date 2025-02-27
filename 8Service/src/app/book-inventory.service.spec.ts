import { TestBed } from '@angular/core/testing';

import { BookInventoryService } from './book-inventory.service';

describe('BookInventoryService', () => {
  let service: BookInventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookInventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
