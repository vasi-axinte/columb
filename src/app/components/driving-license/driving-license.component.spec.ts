import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivingLicenseComponent } from './driving-license.component';

describe('DrivingLicenseComponent', () => {
  let component: DrivingLicenseComponent;
  let fixture: ComponentFixture<DrivingLicenseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrivingLicenseComponent]
    });
    fixture = TestBed.createComponent(DrivingLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
