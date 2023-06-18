import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimesDetailsComponent } from './crimes-details.component';

describe('CrimesDetailsComponent', () => {
  let component: CrimesDetailsComponent;
  let fixture: ComponentFixture<CrimesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrimesDetailsComponent]
    });
    fixture = TestBed.createComponent(CrimesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
