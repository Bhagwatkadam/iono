import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoveryScanListComponent } from './discovery-scan-list.component';

describe('DiscoveryScanListComponent', () => {
  let component: DiscoveryScanListComponent;
  let fixture: ComponentFixture<DiscoveryScanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscoveryScanListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoveryScanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
