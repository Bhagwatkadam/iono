import { TestBed } from '@angular/core/testing';

import { DiscoveryService } from './discovery.service';

describe('DiscoveryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiscoveryService = TestBed.get(DiscoveryService);
    expect(service).toBeTruthy();
  });
});
