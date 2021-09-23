import { TestBed } from '@angular/core/testing';

import { CartridgeService } from './cartridge.service';

describe('CartridgeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartridgeService = TestBed.get(CartridgeService);
    expect(service).toBeTruthy();
  });
});
