import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolyInSubpageUrlElementComponent } from './poly-in-subpage-url-element.component';

describe('PolyInSubpageUrlElementComponent', () => {
  let component: PolyInSubpageUrlElementComponent;
  let fixture: ComponentFixture<PolyInSubpageUrlElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolyInSubpageUrlElementComponent]
    });
    fixture = TestBed.createComponent(PolyInSubpageUrlElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
