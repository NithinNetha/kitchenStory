import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintOrderComponent } from './print-order.component';

describe('PrintOrderComponent', () => {
  let component: PrintOrderComponent;
  let fixture: ComponentFixture<PrintOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
