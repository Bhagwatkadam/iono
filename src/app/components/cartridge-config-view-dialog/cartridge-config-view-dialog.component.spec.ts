import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartridgeConfigViewDialogComponent } from './cartridge-config-view-dialog.component';

describe('CartridgeConfigViewDialogComponent', () => {
  let component: CartridgeConfigViewDialogComponent;
  let fixture: ComponentFixture<CartridgeConfigViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartridgeConfigViewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartridgeConfigViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
