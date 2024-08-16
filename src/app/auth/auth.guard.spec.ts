import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard'; // Ensure correct import path

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true for canLoad', () => {
    const result = guard.canLoad({} as any, [] as any); // Adjust based on actual route/segments
    expect(result).toBe(true); // Adjust based on actual logic
  });
});