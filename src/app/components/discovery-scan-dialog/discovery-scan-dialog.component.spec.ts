import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoveryScanDialogComponent } from './discovery-scan-dialog.component';

describe('DiscoveryScanDialogComponent', () => {
  let component: DiscoveryScanDialogComponent;
  let fixture: ComponentFixture<DiscoveryScanDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscoveryScanDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoveryScanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
