import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelDocsSamplesComponent } from './travel-docs-samples.component';

describe('TravelDocsSamplesComponent', () => {
  let component: TravelDocsSamplesComponent;
  let fixture: ComponentFixture<TravelDocsSamplesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TravelDocsSamplesComponent]
    });
    fixture = TestBed.createComponent(TravelDocsSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
