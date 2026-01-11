import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard (class-based)', () => {
  let guard: AuthGuard;

  const authServiceStub = {
    getUser: () => null,
  } as any;

  const routerStub = {
    navigate: jasmine.createSpy('navigate'),
  } as unknown as Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerStub },
        { provide: AuthService, useValue: authServiceStub },
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
