import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolyWithChildrenElementComponent } from './poly-with-children-element.component';

describe('PolyWithChildrenElementComponent', () => {
  let component: PolyWithChildrenElementComponent;
  let fixture: ComponentFixture<PolyWithChildrenElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolyWithChildrenElementComponent]
    });
    fixture = TestBed.createComponent(PolyWithChildrenElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
