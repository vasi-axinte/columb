import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolyDirectLinkElementComponent } from './poly-direct-link-element.component';

describe('PolyDirectLinkElementComponent', () => {
  let component: PolyDirectLinkElementComponent;
  let fixture: ComponentFixture<PolyDirectLinkElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolyDirectLinkElementComponent]
    });
    fixture = TestBed.createComponent(PolyDirectLinkElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
