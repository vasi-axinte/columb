import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiafComponent } from './tiaf.component';

describe('TiafComponent', () => {
  let component: TiafComponent;
  let fixture: ComponentFixture<TiafComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiafComponent]
    });
    fixture = TestBed.createComponent(TiafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
