import { TestBed } from '@angular/core/testing';

import { LibraryBackendControllerService } from './library-backend-controller.service';

describe('LibrayBackendControllerService', () => {
  let service: LibraryBackendControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibraryBackendControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
