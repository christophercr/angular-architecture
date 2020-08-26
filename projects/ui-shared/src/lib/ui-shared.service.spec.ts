import { TestBed } from '@angular/core/testing';

import { UiSharedService } from './ui-shared.service';

describe('UiSharedService', () => {
  let service: UiSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
