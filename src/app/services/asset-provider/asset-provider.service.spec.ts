import { TestBed } from '@angular/core/testing';

import { AssetProviderService } from './asset-provider.service';
import { HttpClientModule } from '@angular/common/http';

describe('AssetProviderService', () => {
  let service: AssetProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
     imports: [HttpClientModule]
    });
    service = TestBed.inject(AssetProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
