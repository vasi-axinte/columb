import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitCalculatorComponent } from './digit-calculator.component';

describe('DigitCalculatorComponent', () => {
  let component: DigitCalculatorComponent;
  let fixture: ComponentFixture<DigitCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DigitCalculatorComponent]
    });
    fixture = TestBed.createComponent(DigitCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
