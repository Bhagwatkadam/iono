import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceModelMappingComponent } from './device-model-mapping.component';

describe('DeviceModelMappingComponent', () => {
  let component: DeviceModelMappingComponent;
  let fixture: ComponentFixture<DeviceModelMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceModelMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceModelMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
