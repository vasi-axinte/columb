import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolyNoTypeElementComponent } from './poly-no-type-element.component';

describe('PolyNoTypeElementComponent', () => {
  let component: PolyNoTypeElementComponent;
  let fixture: ComponentFixture<PolyNoTypeElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolyNoTypeElementComponent]
    });
    fixture = TestBed.createComponent(PolyNoTypeElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
