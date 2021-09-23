import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDevicesViewDialogComponent } from './all-devices-view-dialog.component';

describe('AllDevicesViewDialogComponent', () => {
  let component: AllDevicesViewDialogComponent;
  let fixture: ComponentFixture<AllDevicesViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDevicesViewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDevicesViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
