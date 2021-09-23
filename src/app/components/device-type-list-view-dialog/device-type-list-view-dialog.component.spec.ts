import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTypeListViewDialogComponent } from './device-type-list-view-dialog.component';

describe('DeviceTypeListViewDialogComponent', () => {
  let component: DeviceTypeListViewDialogComponent;
  let fixture: ComponentFixture<DeviceTypeListViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceTypeListViewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceTypeListViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
