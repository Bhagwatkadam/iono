import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCartridgesListComponent } from './all-cartridges-list.component';

describe('AllCartridgesListComponent', () => {
  let component: AllCartridgesListComponent;
  let fixture: ComponentFixture<AllCartridgesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCartridgesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCartridgesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
