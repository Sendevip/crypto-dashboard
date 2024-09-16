import { TestBed } from '@angular/core/testing';

import { CryptoTableConfigService} from './crypto-table-config.service';

describe('CryptoTableConfigService', () => {
  let service: CryptoTableConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoTableConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
