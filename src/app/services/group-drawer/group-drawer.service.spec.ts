import { TestBed } from '@angular/core/testing';

import { GroupDrawerService } from './group-drawer.service';

describe('GroupDrawerService', () => {
  let service: GroupDrawerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupDrawerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
