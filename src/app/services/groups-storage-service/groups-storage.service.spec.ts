import { TestBed } from '@angular/core/testing';

import { GroupsStorageService } from './groups-storage.service';

describe('GroupsStorageServiceService', () => {
  let service: GroupsStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupsStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
