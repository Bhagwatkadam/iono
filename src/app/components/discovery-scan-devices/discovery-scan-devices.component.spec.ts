import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoveryScanDevicesComponent } from './discovery-scan-devices.component';

describe('DiscoveryScanDevicesComponent', () => {
  let component: DiscoveryScanDevicesComponent;
  let fixture: ComponentFixture<DiscoveryScanDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscoveryScanDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoveryScanDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
