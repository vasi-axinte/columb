import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalCheckComponent } from './technical-check.component';

describe('TechnicalCheckComponent', () => {
  let component: TechnicalCheckComponent;
  let fixture: ComponentFixture<TechnicalCheckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechnicalCheckComponent]
    });
    fixture = TestBed.createComponent(TechnicalCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
