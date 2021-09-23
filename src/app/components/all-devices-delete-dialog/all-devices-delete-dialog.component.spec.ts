import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDevicesDeleteDialogComponent } from './all-devices-delete-dialog.component';

describe('AllDevicesDeleteDialogComponent', () => {
  let component: AllDevicesDeleteDialogComponent;
  let fixture: ComponentFixture<AllDevicesDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDevicesDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDevicesDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
