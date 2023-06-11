import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolyElementListComponent } from './poly-element-list.component';

describe('PolyElementListComponent', () => {
  let component: PolyElementListComponent;
  let fixture: ComponentFixture<PolyElementListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolyElementListComponent]
    });
    fixture = TestBed.createComponent(PolyElementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
