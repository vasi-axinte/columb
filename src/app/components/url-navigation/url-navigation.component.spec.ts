import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlNavigationComponent } from './url-navigation.component';

describe('UrlNavigationComponent', () => {
  let component: UrlNavigationComponent;
  let fixture: ComponentFixture<UrlNavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UrlNavigationComponent]
    });
    fixture = TestBed.createComponent(UrlNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
