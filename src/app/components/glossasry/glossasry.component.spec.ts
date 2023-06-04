import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlossasryComponent } from './glossasry.component';

describe('GlossasryComponent', () => {
  let component: GlossasryComponent;
  let fixture: ComponentFixture<GlossasryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlossasryComponent]
    });
    fixture = TestBed.createComponent(GlossasryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
