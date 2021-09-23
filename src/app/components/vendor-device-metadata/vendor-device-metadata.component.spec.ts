import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDeviceMetadataComponent } from './vendor-device-metadata.component';

describe('VendorDeviceMetadataComponent', () => {
  let component: VendorDeviceMetadataComponent;
  let fixture: ComponentFixture<VendorDeviceMetadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorDeviceMetadataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorDeviceMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
