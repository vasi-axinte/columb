import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolyCountryElementComponent } from './poly-country-element.component';

describe('PolyCountryElementComponent', () => {
  let component: PolyCountryElementComponent;
  let fixture: ComponentFixture<PolyCountryElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolyCountryElementComponent]
    });
    fixture = TestBed.createComponent(PolyCountryElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
