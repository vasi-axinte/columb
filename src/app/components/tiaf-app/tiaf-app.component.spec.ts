import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiafAppComponent } from './tiaf-app.component';

describe('TiafAppComponent', () => {
  let component: TiafAppComponent;
  let fixture: ComponentFixture<TiafAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiafAppComponent]
    });
    fixture = TestBed.createComponent(TiafAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
