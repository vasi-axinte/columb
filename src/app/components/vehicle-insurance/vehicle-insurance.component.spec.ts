import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleInsuranceComponent } from './vehicle-insurance.component';

describe('VehicleInsuranceComponent', () => {
  let component: VehicleInsuranceComponent;
  let fixture: ComponentFixture<VehicleInsuranceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleInsuranceComponent]
    });
    fixture = TestBed.createComponent(VehicleInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
