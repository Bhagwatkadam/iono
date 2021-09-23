import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPanalComponent } from './data-panal.component';

describe('DataPanalComponent', () => {
  let component: DataPanalComponent;
  let fixture: ComponentFixture<DataPanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataPanalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
