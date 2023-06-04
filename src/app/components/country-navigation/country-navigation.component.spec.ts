import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryNavigationComponent } from './country-navigation.component';

describe('CountryNavigationComponent', () => {
  let component: CountryNavigationComponent;
  let fixture: ComponentFixture<CountryNavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountryNavigationComponent]
    });
    fixture = TestBed.createComponent(CountryNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
